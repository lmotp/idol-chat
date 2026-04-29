import type { User } from '@supabase/supabase-js';
import type { AuthResponse } from '@/types/domain/user';
import type { SupabaseProfileRow } from '@/types/domain/supabase';

export const DEFAULT_PROFILE_IMG = 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240';

export const normalizeEmail = (value: string) => value.trim().replace(/^["']+|["']+$/g, '');

export const getAuthErrorMessage = (error: unknown, fallback = '인증에 실패했습니다.') => {
  if (!error || typeof error !== 'object') {
    return fallback;
  }

  const authError = error as { message?: string; code?: string; status?: number };
  const message = authError.message ?? '';
  const code = authError.code ?? '';

  if (code === 'email_not_confirmed' || message.includes('Email not confirmed')) {
    return '이메일 인증이 완료되지 않았습니다. 가입 메일을 확인한 뒤 다시 로그인해주세요.';
  }

  if (code === 'invalid_credentials' || message.includes('Invalid login credentials')) {
    return '이메일 또는 비밀번호가 올바르지 않습니다.';
  }

  if (authError.status === 429 || message.includes('Too Many Requests')) {
    return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
  }

  return message || fallback;
};

export const createProfilePayloadFromUser = (
  user: User,
  email: string,
  overrides: Partial<SupabaseProfileRow> = {},
) => ({
  id: user.id,
  email,
  nickname: overrides.nickname ?? user.user_metadata?.nickname ?? email.split('@')[0] ?? '사용자',
  profileimg: overrides.profileimg ?? user.user_metadata?.profileimg ?? DEFAULT_PROFILE_IMG,
  myself: overrides.myself ?? user.user_metadata?.myself ?? '안녕하세요? 잘 부탁드립니다',
  gender: overrides.gender ?? user.user_metadata?.gender ?? 'nothing',
  location: overrides.location ?? user.user_metadata?.location ?? '',
  first_category: overrides.first_category ?? false,
  category: overrides.category ?? ['전체'],
  login_time: overrides.login_time ?? new Date().toISOString(),
});

export const buildAuthResponseFromProfile = (profile: SupabaseProfileRow): AuthResponse => ({
  loginSuccess: true,
  _id: profile.id,
  email: profile.email,
  nickname: profile.nickname,
  profileimg: profile.profileimg ?? DEFAULT_PROFILE_IMG,
  profileImg: profile.profileimg ?? DEFAULT_PROFILE_IMG,
  myself: profile.myself ?? '',
  gender: profile.gender ?? 'nothing',
  location: profile.location ?? '',
  category: profile.category ?? ['전체'],
  firstCategory: Boolean(profile.first_category),
  loginTime: profile.login_time ?? new Date().toISOString(),
});
