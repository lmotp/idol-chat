import { supabase } from '@/app/supabaseClient';
import type { AddressApi, AddressSuggestion } from '@/types/domain/address';

type SearchResponse = AddressSuggestion[];
type ReverseResponse = {
  address: string | null;
};

export const addressApi: AddressApi = {
  async search(query) {
    if (!supabase) {
      throw new Error('Supabase client is not configured.');
    }
    const client = supabase;

    const { data, error } = await client.functions.invoke<SearchResponse>('address-search', {
      body: { query },
    });

    if (error) throw error;
    return data ?? [];
  },

  async reverse(latitude, longitude) {
    if (!supabase) {
      throw new Error('Supabase client is not configured.');
    }
    const client = supabase;

    const { data, error } = await client.functions.invoke<ReverseResponse>('address-reverse', {
      body: { latitude, longitude },
    });

    if (error) throw error;
    return data?.address ?? null;
  },
};
