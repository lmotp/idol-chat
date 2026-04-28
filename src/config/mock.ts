import { hasSupabaseConfig } from '@/app/supabaseClient';
const env = import.meta.env;

export const useMockApi = env.DEV && env.VITE_USE_MOCKS !== 'false' && !hasSupabaseConfig;
