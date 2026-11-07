-- ==============================================================================
-- ADMIN ACCESS FIX: PROMOTE OWNER TO SUPER ADMIN
-- Run this in your Supabase SQL Editor to grant admin access to your account.
-- ==============================================================================

-- 1. Ensure the user exists in auth.users (they must have signed up/tried to login once)
-- 2. Insert or update their record in public.admin_users

-- Promote 'pattisrinivas132@gmail.com' (from the portal login attempt)
INSERT INTO public.admin_users (user_id, email, role)
SELECT id, email, 'super_admin'
FROM auth.users
WHERE email = 'pattisrinivas132@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';

-- Also promote 'srifebruary2026@gmail.com' (alternate account)
INSERT INTO public.admin_users (user_id, email, role)
SELECT id, email, 'super_admin'
FROM auth.users
WHERE email = 'srifebruary2026@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';

-- Also promote 'srilaxmiphoto@gmail.com' (studio official email)
INSERT INTO public.admin_users (user_id, email, role)
SELECT id, email, 'super_admin'
FROM auth.users
WHERE email = 'srilaxmiphoto@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';
