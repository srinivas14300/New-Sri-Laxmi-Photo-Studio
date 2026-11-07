-- ==============================================================================
-- ADDITIVE MIGRATION: SAFETY PROTOCOLS & BEFORE/AFTER SHOWCASE
-- Final Production Version - Idempotent, Hardened & Secure
-- ==============================================================================

-- 1. Ensure extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. HARDENED ADMIN CHECK FUNCTION (SET search_path = '')
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  -- Check if user is in public.admin_users table
  -- We use schema-qualified references for security
  IF EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  ) THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 3. SAFETY PROTOCOLS TABLE
CREATE TABLE IF NOT EXISTS public.safety_protocols (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL,
  is_standard_guideline boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.safety_protocols 
ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;

-- 4. BEFORE/AFTER TABLE (Retouching showcase)
CREATE TABLE IF NOT EXISTS public.before_after (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  before_image text NOT NULL,
  after_image text NOT NULL,
  retouch_highlights text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.before_after 
ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;

-- 5. Table Permissions
GRANT SELECT ON public.safety_protocols, public.before_after TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.safety_protocols, public.before_after TO authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 6. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_safety_protocols_standard ON public.safety_protocols(is_standard_guideline);
CREATE INDEX IF NOT EXISTS idx_safety_protocols_published ON public.safety_protocols(is_published);
CREATE INDEX IF NOT EXISTS idx_before_after_published ON public.before_after(is_published);

-- 7. Enable RLS
ALTER TABLE public.safety_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;

-- 8. Safety Protocols Policies
DO $$ 
BEGIN
  -- Cleanup existing policies to ensure clean state
  DROP POLICY IF EXISTS "Allow public read safety protocols" ON public.safety_protocols;
  DROP POLICY IF EXISTS "Allow admins to manage safety protocols" ON public.safety_protocols;
  
  -- Public SELECT: Only exposed published records
  CREATE POLICY "Allow public read safety protocols" ON public.safety_protocols
    FOR SELECT USING (is_published = true);

  -- Admin CRUD: Full access based on admin_users table via is_admin()
  CREATE POLICY "Allow admins to manage safety protocols" ON public.safety_protocols
    FOR ALL TO authenticated
    USING (public.is_admin()) 
    WITH CHECK (public.is_admin());
END $$;

-- 9. Before/After Policies
DO $$ 
BEGIN
  -- Cleanup existing policies to ensure clean state
  DROP POLICY IF EXISTS "Allow public read before after" ON public.before_after;
  DROP POLICY IF EXISTS "Allow admins to manage before after" ON public.before_after;
  
  -- Public SELECT: Only exposed published records
  CREATE POLICY "Allow public read before after" ON public.before_after
    FOR SELECT USING (is_published = true);

  -- Admin CRUD: Full access based on admin_users table via is_admin()
  CREATE POLICY "Allow admins to manage before after" ON public.before_after
    FOR ALL TO authenticated
    USING (public.is_admin()) 
    WITH CHECK (public.is_admin());
END $$;
