import { supabase, isSupabaseConfigured, STORAGE_BUCKET } from './supabaseClient';

export const storageService = {
  /**
   * Uploads an image to the studio-media bucket
   * @param file The file object to upload
   * @param folder The folder path within the bucket (e.g., 'portfolio', 'services')
   * @returns The public URL of the uploaded image
   */
  async uploadImage(file: File, folder: string = 'general'): Promise<{ url: string | null; error: Error | null }> {
    if (!isSupabaseConfigured || !supabase) {
      // Local fallback: Create an object URL for temporary preview
      // NOTE: This will not persist across browser sessions if the app reloads
      const objectUrl = URL.createObjectURL(file);
      return { url: objectUrl, error: null };
    }

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return { url: null, error: new Error('File must be an image.') };
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return { url: null, error: new Error('Image size must be less than 5MB.') };
      }

      // Generate a clean filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get Public URL
      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      return { url: data.publicUrl, error: null };
    } catch (err: any) {
      console.error('Storage upload error:', err);
      return { url: null, error: err };
    }
  },

  /**
   * Deletes an image from Supabase Storage
   * @param url The public URL of the image to delete
   */
  async deleteImage(url: string): Promise<{ error: Error | null }> {
    if (!isSupabaseConfigured || !supabase) return { error: null };

    try {
      // Extract path from URL
      // Expected format: .../storage/v1/object/public/studio-media/folder/filename.ext
      const urlParts = url.split(`${STORAGE_BUCKET}/`);
      if (urlParts.length < 2) return { error: null }; // Not a supabase storage URL

      const filePath = urlParts[1];
      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([filePath]);

      return { error: error as Error | null };
    } catch (err: any) {
      console.error('Storage delete error:', err);
      return { error: err };
    }
  },

  /**
   * Deletes an image from Cloudinary via the server-side proxy
   * @param public_id The Cloudinary public ID to delete
   */
  async deleteCloudinaryAsset(public_id: string): Promise<{ success: boolean; error: Error | null }> {
    try {
      const response = await fetch('/api/media/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete Cloudinary asset');
      }

      return { success: true, error: null };
    } catch (err: any) {
      console.error('Cloudinary delete error:', err);
      return { success: false, error: err };
    }
  }
};
