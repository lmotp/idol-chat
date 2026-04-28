import { createClient } from '@supabase/supabase-js';

const env = import.meta.env;

export const supabaseUrl = env.VITE_SUPABASE_URL ?? '';
export const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY ?? '';
export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
