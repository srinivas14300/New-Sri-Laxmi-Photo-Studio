import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('your-project-id'));

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  supabaseUrl: string | null;
  hasAnonKey: boolean;
}

export const supabaseConfig: SupabaseConfigStatus = {
  isConfigured: isSupabaseConfigured,
  supabaseUrl: SUPABASE_URL || null,
  hasAnonKey: Boolean(SUPABASE_ANON_KEY)
};

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

export const DB_TABLES = {
  ADMIN_USERS: 'admin_users',
  ENQUIRIES: 'enquiries',
  BOOKINGS: 'bookings',
  PORTFOLIO: 'portfolio',
  SERVICES: 'services',
  PACKAGES: 'packages',
  OFFERS: 'offers',
  REVIEWS: 'reviews',
  HOMEPAGE_SLIDES: 'homepage_slides',
  STUDIO_SETTINGS: 'studio_settings',
  FAQS: 'faqs',
  SAFETY_PROTOCOLS: 'safety_protocols',
  BEFORE_AFTER: 'before_after'
} as const;

export const STORAGE_BUCKET = 'studio-media';
