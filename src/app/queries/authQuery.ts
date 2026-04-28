import axios from 'axios';
import { queryOptions } from '@suspensive/react-query';
import type { AuthResponse } from '@/types/domain/user';

export const authCheckQuery = queryOptions({
  queryKey: ['auth', 'check'] as const,
  queryFn: async (): Promise<AuthResponse | null> => {
    const { data } = await axios.get<AuthResponse>('/api/auth/auth-check');

    if (!data?.loginSuccess) {
      return null;
    }

    return data;
  },
});
