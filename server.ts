import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'i2us3kow',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function createServer() {
  const app = express();
  app.use(express.json());

  // Secure Cloudinary Deletion Route
  // Only authenticated admins should be able to call this.
  // In a real app, we'd verify the Supabase JWT here.
  app.post('/api/media/delete', async (req, res) => {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: 'Missing public_id' });
    }

    try {
      const result = await cloudinary.uploader.destroy(public_id);
      res.json(result);
    } catch (err: any) {
      console.error('Cloudinary deletion error:', err);
      res.status(500).json({ error: err.message || 'Failed to delete asset from Cloudinary' });
    }
  });

  // Discovery Endpoint: List Cloudinary Resources
  app.get('/api/media/list', async (req, res) => {
    try {
      // Fetch resources from Cloudinary Admin API
      // We limit to 100 for discovery; the user mentioned 80 assets total
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: '', // Can be filtered by folder if known
        max_results: 100
      });

      // Map to a cleaner manifest format
      const manifest = result.resources.map((asset: any) => ({
        public_id: asset.public_id,
        secure_url: asset.secure_url,
        format: asset.format,
        width: asset.width,
        height: asset.height,
        resource_type: asset.resource_type,
        created_at: asset.created_at
      }));

      res.json({
        total_count: result.resources.length,
        assets: manifest
      });
    } catch (err: any) {
      console.error('Cloudinary listing error:', err);
      res.status(500).json({ 
        error: err.message || 'Failed to fetch assets from Cloudinary',
        details: err.error?.message || err.toString()
      });
    }
  });

  // Credentials Verification Endpoint
  app.get('/api/media/verify', (req, res) => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
    const apiKey = process.env.CLOUDINARY_API_KEY || '';
    const config = {
      cloud_name: cloudName ? 'Configured' : 'Missing',
      cloud_name_length: cloudName.length,
      cloud_name_preview: `${cloudName.substring(0, 2)}...${cloudName.substring(cloudName.length - 2)}`,
      api_key: apiKey ? 'Configured' : 'Missing',
      api_key_length: apiKey.length,
      api_key_preview: `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}`,
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Configured' : 'Missing'
    };
    const isReady = Object.values(config).every(v => v !== 'Missing' && v !== 0);
    res.json({ isReady, config });
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);

    // Catch-all for dev mode: serve index.html via vite.transformIndexHtml
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

createServer();
