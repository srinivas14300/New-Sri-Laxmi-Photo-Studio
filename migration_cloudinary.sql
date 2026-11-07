-- ==============================================================================
-- ADDITIVE MIGRATION: CLOUDINARY INTEGRATION
-- Adds support for tracking original Cloudinary assets
-- ==============================================================================

-- 1. Add cloudinary_public_id to portfolio table
ALTER TABLE public.portfolio 
ADD COLUMN IF NOT EXISTS cloudinary_public_id text UNIQUE;

-- 2. Add index for faster lookup
CREATE INDEX IF NOT EXISTS idx_portfolio_cloudinary_id ON public.portfolio(cloudinary_public_id);

-- 3. Add column to track asset source (to distinguish owner work from stock)
ALTER TABLE public.portfolio
ADD COLUMN IF NOT EXISTS asset_source text DEFAULT 'studio' CHECK (asset_source IN ('studio', 'external_illustrative'));

-- 4. Update existing items to 'external_illustrative' if they are placeholders
UPDATE public.portfolio 
SET asset_source = 'external_illustrative' 
WHERE is_illustrative_placeholder = true;
