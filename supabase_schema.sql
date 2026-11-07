-- ==============================================================================
-- NEW SRI LAXMI BABY PHOTO STUDIO - COMPLETE IDEMPOTENT PRODUCTION DATABASE SCHEMA & RLS
-- Safely re-runnable in Supabase SQL Editor
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. TABLES & SCHEMAS (Idempotent table & column definitions)
-- ==============================================================================

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  email text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_name text NOT NULL,
  phone text NOT NULL,
  shoot_type text NOT NULL,
  shoot_category text,
  baby_age_or_due_date text,
  preferred_date text,
  notes text,
  status text NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Slot Reserved', 'Shoot Completed', 'Archived')),
  source text NOT NULL DEFAULT 'Web Contact Form' CHECK (source IN ('WhatsApp Link', 'Web Contact Form')),
  received_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_name text NOT NULL,
  phone text NOT NULL,
  shoot_type text NOT NULL,
  shoot_category text,
  baby_age_or_due_date text,
  preferred_date text,
  event_date text,
  package_interested text,
  status text NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Slot Reserved', 'Shoot Completed', 'Archived')),
  source text NOT NULL DEFAULT 'Web Contact Form',
  notes text,
  received_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS public.portfolio (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  category text NOT NULL,
  category_label text NOT NULL,
  age_group text NOT NULL,
  theme text NOT NULL,
  image_url text NOT NULL,
  aspect_ratio text DEFAULT '3:4',
  description text,
  featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  display_order integer DEFAULT 0,
  is_illustrative_placeholder boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add Cloudinary & Asset Source columns idempotently
ALTER TABLE public.portfolio ADD COLUMN IF NOT EXISTS cloudinary_public_id text UNIQUE;
ALTER TABLE public.portfolio ADD COLUMN IF NOT EXISTS asset_source text DEFAULT 'studio' CHECK (asset_source IN ('studio', 'external_illustrative'));

-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  short_description text NOT NULL,
  full_description text NOT NULL,
  ideal_age text NOT NULL,
  duration text NOT NULL,
  outfits text NOT NULL,
  starting_price numeric NOT NULL,
  pricing_note text,
  featured_image text NOT NULL,
  gallery_images text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  what_studio_provides text[] DEFAULT '{}',
  what_parents_bring text[] DEFAULT '{}',
  themes text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PACKAGES TABLE
CREATE TABLE IF NOT EXISTS public.packages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  category text NOT NULL,
  category_label text,
  tagline text NOT NULL,
  price numeric NOT NULL,
  price_note text,
  duration text NOT NULL,
  edited_photos integer NOT NULL DEFAULT 0,
  raw_photos_included boolean DEFAULT false,
  outfit_changes integer DEFAULT 1,
  props_included boolean DEFAULT true,
  features text[] DEFAULT '{}',
  is_popular boolean DEFAULT false,
  is_custom_quote boolean DEFAULT false,
  featured_image text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. OFFERS TABLE
CREATE TABLE IF NOT EXISTS public.offers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  tagline text NOT NULL,
  discount_badge text NOT NULL,
  validity_note text NOT NULL,
  description text NOT NULL,
  inclusions text[] DEFAULT '{}',
  terms text[] DEFAULT '{}',
  target_category text NOT NULL,
  whatsapp_message text NOT NULL,
  is_active boolean DEFAULT true,
  is_placeholder boolean DEFAULT false,
  featured_image text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_name text NOT NULL,
  baby_name text NOT NULL,
  baby_age_at_shoot text NOT NULL,
  shoot_type text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  date text NOT NULL,
  city text NOT NULL DEFAULT 'Wanaparthy',
  is_demo_placeholder boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. HOMEPAGE SLIDES TABLE
CREATE TABLE IF NOT EXISTS public.homepage_slides (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  category text NOT NULL,
  tagline text NOT NULL,
  image_url text NOT NULL,
  route_path text NOT NULL,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  is_illustrative_placeholder boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. STUDIO SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.studio_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  short_name text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  phone text NOT NULL,
  phone_display text NOT NULL,
  whatsapp text NOT NULL,
  email text NOT NULL,
  street text NOT NULL,
  area text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  weekdays_hours text NOT NULL,
  weekends_hours text NOT NULL,
  google_maps_url text NOT NULL,
  google_maps_embed text NOT NULL,
  instagram_handle text,
  seo_title text,
  seo_description text,
  carousel_auto_slide boolean DEFAULT true,
  carousel_interval_seconds integer DEFAULT 5,
  enquiry_headline text,
  enquiry_subtitle text,
  footer_description text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL CHECK (category IN ('general', 'safety', 'pricing', 'preparation')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. SAFETY PROTOCOLS TABLE
CREATE TABLE IF NOT EXISTS public.safety_protocols (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL,
  is_standard_guideline boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.safety_protocols ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;

-- 13. BEFORE/AFTER TABLE
CREATE TABLE IF NOT EXISTS public.before_after (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  before_image text NOT NULL,
  after_image text NOT NULL,
  retouch_highlights text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.before_after ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;

-- ==============================================================================
-- 2. INDEXES (Performance)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_published ON public.portfolio(is_published);
CREATE INDEX IF NOT EXISTS idx_portfolio_cloudinary_id ON public.portfolio(cloudinary_public_id);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_safety_protocols_published ON public.safety_protocols(is_published);
CREATE INDEX IF NOT EXISTS idx_before_after_published ON public.before_after(is_published);

-- ==============================================================================
-- 3. TABLE PERMISSIONS
-- ==============================================================================
GRANT SELECT ON public.safety_protocols, public.before_after, public.portfolio, public.services, public.packages, public.offers, public.reviews, public.homepage_slides, public.studio_settings, public.faqs TO anon, authenticated;
GRANT INSERT ON public.enquiries, public.bookings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.safety_protocols, public.before_after, public.portfolio, public.services, public.packages, public.offers, public.reviews, public.homepage_slides, public.studio_settings, public.faqs, public.enquiries, public.bookings, public.admin_users TO authenticated;

-- ==============================================================================
-- 4. SECURITY DEFINER HELPER FUNCTIONS (Bypassing RLS Recursion)
-- ==============================================================================

-- Helper 1: Check if current authenticated user is in public.admin_users
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
END;
$$;

-- Helper 2: Check if current authenticated user is SUPER ADMIN
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND role = 'super_admin'
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_super_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_super_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

-- Trigger Function: Auto-provision super admin role when studio owners register/sign-in
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF LOWER(NEW.email) IN (
    'pattisrinivas132@gmail.com',
    'srifebruary2026@gmail.com',
    'srilaxmiphoto@gmail.com'
  ) THEN
    INSERT INTO public.admin_users (user_id, email, role)
    VALUES (NEW.id, NEW.email, 'super_admin')
    ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin', email = EXCLUDED.email;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();

-- Immediate promotion of any existing accounts in auth.users matching studio emails
INSERT INTO public.admin_users (user_id, email, role)
SELECT id, email, 'super_admin'
FROM auth.users
WHERE LOWER(email) IN (
  'pattisrinivas132@gmail.com',
  'srifebruary2026@gmail.com',
  'srilaxmiphoto@gmail.com'
)
ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin', email = EXCLUDED.email;

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;

-- 1. admin_users policies
-- Uses SECURITY DEFINER is_super_admin() to prevent recursion
DROP POLICY IF EXISTS "Allow users to read their own admin record" ON public.admin_users;
CREATE POLICY "Allow users to read their own admin record" ON public.admin_users
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.is_super_admin());

DROP POLICY IF EXISTS "Allow super admins to manage all admin records" ON public.admin_users;
CREATE POLICY "Allow super admins to manage all admin records" ON public.admin_users
  FOR ALL TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- 2. enquiries policies (Public lead creation; Admin only view/manage)
DROP POLICY IF EXISTS "Allow public to create enquiries" ON public.enquiries;
CREATE POLICY "Allow public to create enquiries" ON public.enquiries
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admins to view and manage enquiries" ON public.enquiries;
CREATE POLICY "Allow admins to view and manage enquiries" ON public.enquiries
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. bookings policies (Public booking creation; Admin only view/manage)
DROP POLICY IF EXISTS "Allow public to create bookings" ON public.bookings;
CREATE POLICY "Allow public to create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admins to view and manage bookings" ON public.bookings;
CREATE POLICY "Allow admins to view and manage bookings" ON public.bookings
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 4. portfolio policies
DROP POLICY IF EXISTS "Allow public read published portfolio" ON public.portfolio;
CREATE POLICY "Allow public read published portfolio" ON public.portfolio
  FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Allow admins to manage portfolio" ON public.portfolio;
CREATE POLICY "Allow admins to manage portfolio" ON public.portfolio
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 5. services policies
DROP POLICY IF EXISTS "Allow public read services" ON public.services;
CREATE POLICY "Allow public read services" ON public.services
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admins to manage services" ON public.services;
CREATE POLICY "Allow admins to manage services" ON public.services
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6. packages policies
DROP POLICY IF EXISTS "Allow public read packages" ON public.packages;
CREATE POLICY "Allow public read packages" ON public.packages
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admins to manage packages" ON public.packages;
CREATE POLICY "Allow admins to manage packages" ON public.packages
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 7. offers policies
DROP POLICY IF EXISTS "Allow public read active offers" ON public.offers;
CREATE POLICY "Allow public read active offers" ON public.offers
  FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Allow admins to manage offers" ON public.offers;
CREATE POLICY "Allow admins to manage offers" ON public.offers
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 8. reviews policies
DROP POLICY IF EXISTS "Allow public read reviews" ON public.reviews;
CREATE POLICY "Allow public read reviews" ON public.reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admins to manage reviews" ON public.reviews;
CREATE POLICY "Allow admins to manage reviews" ON public.reviews
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 9. homepage_slides policies
DROP POLICY IF EXISTS "Allow public read published slides" ON public.homepage_slides;
CREATE POLICY "Allow public read published slides" ON public.homepage_slides
  FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Allow admins to manage homepage slides" ON public.homepage_slides;
CREATE POLICY "Allow admins to manage homepage slides" ON public.homepage_slides
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 10. studio_settings policies
DROP POLICY IF EXISTS "Allow public read studio settings" ON public.studio_settings;
CREATE POLICY "Allow public read studio settings" ON public.studio_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admins to manage studio settings" ON public.studio_settings;
CREATE POLICY "Allow admins to manage studio settings" ON public.studio_settings
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 11. faqs policies
DROP POLICY IF EXISTS "Allow public read faqs" ON public.faqs;
CREATE POLICY "Allow public read faqs" ON public.faqs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admins to manage faqs" ON public.faqs;
CREATE POLICY "Allow admins to manage faqs" ON public.faqs
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 12. safety_protocols policies
DROP POLICY IF EXISTS "Allow public read safety protocols" ON public.safety_protocols;
CREATE POLICY "Allow public read safety protocols" ON public.safety_protocols
  FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Allow admins to manage safety protocols" ON public.safety_protocols;
CREATE POLICY "Allow admins to manage safety protocols" ON public.safety_protocols
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 13. before_after policies
DROP POLICY IF EXISTS "Allow public read before after" ON public.before_after;
CREATE POLICY "Allow public read before after" ON public.before_after
  FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Allow admins to manage before after" ON public.before_after;
CREATE POLICY "Allow admins to manage before after" ON public.before_after
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ==============================================================================
-- 6. STORAGE BUCKET & POLICIES
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('studio-media', 'studio-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Studio Media" ON storage.objects;
CREATE POLICY "Public Read Studio Media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'studio-media');

DROP POLICY IF EXISTS "Admin Read Studio Media" ON storage.objects;
CREATE POLICY "Admin Read Studio Media"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'studio-media'
    AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admin Upload Studio Media" ON storage.objects;
CREATE POLICY "Admin Upload Studio Media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'studio-media'
    AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admin Update Studio Media" ON storage.objects;
CREATE POLICY "Admin Update Studio Media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'studio-media'
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id = 'studio-media'
    AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admin Delete Studio Media" ON storage.objects;
CREATE POLICY "Admin Delete Studio Media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'studio-media'
    AND public.is_admin()
  );

-- ==============================================================================
-- 7. OWNER-PROVIDED CLOUDINARY PHOTOGRAPHS (16 GENUINE ASSETS)
-- ==============================================================================
INSERT INTO public.portfolio (
  title, 
  category, 
  category_label, 
  age_group, 
  theme, 
  image_url, 
  cloudinary_public_id, 
  asset_source, 
  is_published, 
  is_illustrative_placeholder,
  display_order,
  aspect_ratio
) VALUES
('Celestial Cradle Sleep', 'newborn', 'Newborn', '12 Days Old', 'Traditional Woven Basket & Silk Drape', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955112/1.png', '1', 'studio', true, false, 1, '3:4'),
('First Curiosities', 'baby', 'Baby & Child', '7 Months Old', 'Studio Sitter Milestone', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955264/2.png', '2', 'studio', true, false, 2, '3:4'),
('Lavender Dreams Swaddle', 'newborn', 'Newborn', '10 Days Old', 'Fine Art Swaddle & Floral Crown', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955260/3.png', '3', 'studio', true, false, 3, '3:4'),
('Traditional Cradle Joy', 'baby', 'Baby & Child', '6 Months Old', 'Handcrafted Wood Cradle & Marigolds', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/4.png', '4', 'studio', true, false, 4, '3:4'),
('Little Explorer', 'baby', 'Baby & Child', '8 Months Old', 'Minimalist Studio Floor Session', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/5.png', '5', 'studio', true, false, 5, '3:4'),
('Midnight Blue Serenity', 'newborn', 'Newborn', '14 Days Old', 'Deep Blue Wrap & Moon Prop', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955267/6.png', '6', 'studio', true, false, 6, '3:4'),
('Smiling Sitter', 'baby', 'Baby & Child', '9 Months Old', 'Natural Oak Bench Portrait', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955258/7.png', '7', 'studio', true, false, 7, '3:4'),
('Rustic Basket Slumber', 'newborn', 'Newborn', '8 Days Old', 'Organic Wool Nest & Timber Bowl', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955264/8.png', '8', 'studio', true, false, 8, '3:4'),
('Innocent Gaze', 'baby', 'Baby & Child', '7 Months Old', 'Soft Linen Textures', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/9.png', '9', 'studio', true, false, 9, '3:4'),
('Angelic Rest', 'newborn', 'Newborn', '15 Days Old', 'Warm Tones & Fuzzy Rug', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955269/10.png', '10', 'studio', true, false, 10, '3:4'),
('Tummy Time Triumph', 'baby', 'Baby & Child', '6 Months Old', 'Signature Studio Milestone', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955272/11.png', '11', 'studio', true, false, 11, '3:4'),
('Emerald Green Swaddle', 'newborn', 'Newborn', '11 Days Old', 'Luxe Velvet Wrap', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955273/12.png', '12', 'studio', true, false, 12, '3:4'),
('Toddler Wonder', 'baby', 'Baby & Child', '14 Months Old', 'Clean Canvas Backdrop', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955276/13.png', '13', 'studio', true, false, 13, '3:4'),
('Pure Slumber', 'newborn', 'Newborn', '9 Days Old', 'Minimalist White Theme', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955288/14.png', '14', 'studio', true, false, 14, '3:4'),
('Playful Moments', 'baby', 'Baby & Child', '10 Months Old', 'Studio Toy Interaction', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955283/15.png', '15', 'studio', true, false, 15, '3:4'),
('Dusty Rose Newborn', 'newborn', 'Newborn', '12 Days Old', 'Signature Swaddle Technique', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955282/16.png', '16', 'studio', true, false, 16, '3:4')
ON CONFLICT (cloudinary_public_id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  category_label = EXCLUDED.category_label,
  age_group = EXCLUDED.age_group,
  theme = EXCLUDED.theme,
  image_url = EXCLUDED.image_url,
  asset_source = 'studio',
  is_published = true,
  is_illustrative_placeholder = false;
