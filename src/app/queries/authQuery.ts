import { queryOptions } from '@suspensive/react-query';
import { apiClient } from '@/app/apiClient';
import type { AuthResponse } from '@/types/domain/user';

export const authCheckQuery = queryOptions({
  queryKey: ['auth', 'check'] as const,
  queryFn: async (): Promise<AuthResponse | null> => {
    const { data } = await apiClient.get<AuthResponse>('/api/auth/auth-check');

    if (!data?.loginSuccess) {
      return null;
    }

    return data;
  },
});
