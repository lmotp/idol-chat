export interface SupabaseProfileRow {
  id: string;
  email: string;
  nickname: string;
  profileimg: string | null;
  myself: string | null;
  gender: string | null;
  location: string | null;
  first_category: boolean | null;
  category: string[] | null;
  login_time: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseClassRow {
  id: string;
  location: string;
  category: string;
  class_name: string;
  class_target: string;
  member_count: number;
  make_user: string;
  thumbnail: string | null;
  hash_tag: string[] | null;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseMeetingRow {
  id: string;
  class_id: string;
  name: string;
  place: string;
  price: string;
  member_count: number;
  day: string;
  time: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseChatMessageRow {
  id: string;
  class_id: string;
  user_id: string;
  message: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseClassInviteRow {
  id: string;
  class_id: string;
  user_id: string;
  created_at: string;
}
