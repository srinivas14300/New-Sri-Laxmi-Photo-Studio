import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface AdminUserRecord {
  id: string;
  user_id: string;
  role: string;
  email?: string;
}

const AUTHORIZED_ADMIN_EMAILS = [
  'pattisrinivas132@gmail.com',
  'srifebruary2026@gmail.com',
  'srilaxmiphoto@gmail.com'
];

function isAuthorizedEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return AUTHORIZED_ADMIN_EMAILS.includes(clean);
}

export const authService = {
  async getCurrentUser() {
    if (!isSupabaseConfigured || !supabase) {
      return null;
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) return null;

      let role: string | null = null;
      let adminRecordId: string | null = null;

      try {
        const { data: adminRecord } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (adminRecord) {
          role = adminRecord.role;
          adminRecordId = adminRecord.id;
        }
      } catch (e) {
        console.warn('Could not query admin_users table:', e);
      }

      if (!role) {
        role = 'super_admin';
      }

      return {
        ...session.user,
        role,
        adminRecordId
      };
    } catch (err) {
      console.error('Auth get current user error:', err);
      return null;
    }
  },

  async login(email: string, password: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { user: null, error: new Error('Supabase not configured.') };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { user: null, error };

      if (!data.user) {
        return { user: null, error: new Error('Login failed: No user returned.') };
      }

      let role: string | null = null;
      let adminRecordId: string | null = null;

      try {
        const { data: adminRecord } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (adminRecord) {
          role = adminRecord.role;
          adminRecordId = adminRecord.id;
        }
      } catch (e) {
        console.warn('Could not query admin_users table:', e);
      }

      if (!role) {
        // Fallback: Default to super_admin for validly authenticated studio logins
        role = 'super_admin';
        try {
          await supabase
            .from('admin_users')
            .upsert({
              user_id: data.user.id,
              email: data.user.email,
              role: 'super_admin'
            }, { onConflict: 'user_id' });
        } catch (e) {
          console.warn('Auto-upsert admin user error:', e);
        }
      }

      return { 
        user: { 
          ...data.user, 
          role,
          adminRecordId
        }, 
        error: null 
      };
    } catch (err: any) {
      return { user: null, error: err };
    }
  },

  async logout() {
    if (!isSupabaseConfigured || !supabase) return { error: null };
    return await supabase.auth.signOut();
  },

  async resetPassword(email: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { error: new Error('Supabase not configured.') };
    }
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`
    });
  },

  async sendOtp(email: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { data: null, error: new Error('Supabase not configured.') };
    }

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, 
        }
      });
      return { data, error };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },

  async verifyOtp(email: string, token: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { data: null, error: new Error('Supabase not configured.') };
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });

      if (error) return { data: null, error };
      if (!data.user) return { data: null, error: new Error('Verification failed.') };

      let role: string | null = null;
      try {
        const { data: adminRecord } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (adminRecord) role = adminRecord.role;
      } catch (e) {
        console.warn('Otp admin check error:', e);
      }

      if (!role && isAuthorizedEmail(data.user.email)) {
        role = 'super_admin';
      }

      if (!role) {
        await supabase.auth.signOut();
        return { data: null, error: new Error('Unauthorized: You are not registered as an administrator.') };
      }

      return { 
        data: {
          ...data,
          user: { 
            ...data.user, 
            role 
          }
        }, 
        error: null 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
};
