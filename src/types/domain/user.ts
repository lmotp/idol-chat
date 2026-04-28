export interface AuthUser {
  _id?: string;
  loginSuccess?: boolean;
  firstCategory?: boolean;
  loginTime?: string;
  gender?: string;
  location?: string;
  myself?: string;
  nickname?: string;
  nickName?: string;
  profileimg?: string;
  profileImg?: string;
  category?: string[];
  email?: string;
  [key: string]: unknown;
}

export interface AuthResponse extends AuthUser {
  message?: string;
}

export interface AuthUserState {
  result: AuthUser;
  error: unknown | null;
}
