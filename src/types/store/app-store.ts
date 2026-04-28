import type { CategoryOption } from '@/types/domain/category';
import type { AuthResponse, AuthUser, AuthUserState } from '@/types/domain/user';

export interface AppStoreState {
  user: AuthUserState;
  categories: readonly CategoryOption[];
  selectedCategory: string;
  chatMemberOpen: boolean;
  classJoinState: boolean;
  setUser: (result?: AuthUser | AuthResponse | null) => void;
  clearUser: () => void;
  fetchUser: () => Promise<AuthResponse | null>;
  setSelectedCategory: (value: string) => void;
  resetSelectedCategory: () => void;
  toggleChatMember: () => void;
  toggleClassJoin: () => void;
}
