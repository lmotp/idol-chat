import { format } from 'date-fns';
import { supabase as supabaseMaybe, hasSupabaseConfig } from '@/app/supabaseClient';
import type { AuthResponse } from '@/types/domain/user';
import type {
  SupabaseChatMessageRow,
  SupabaseClassInviteRow,
  SupabaseClassRow,
  SupabaseMeetingRow,
  SupabaseProfileRow,
} from '@/types/domain/supabase';

type JsonRecord = Record<string, unknown>;
type ApiRequestConfig = {
  method?: string;
  url?: string;
  baseURL?: string;
  data?: unknown;
};

type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: ApiRequestConfig;
  request: unknown;
};

const supabase = supabaseMaybe as NonNullable<typeof supabaseMaybe>;

const DEFAULT_PROFILE_IMG = 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240';
const CLASS_BUCKET = 'class-images';
const PROFILE_BUCKET = 'profile-images';

const state = globalThis as typeof globalThis & {
  __IDOL_CHAT_API_BRIDGE__?: boolean;
};

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

function toRecord(value: unknown): JsonRecord {
  if (!value || typeof value !== 'object') {
    return {};
  }

  return value as JsonRecord;
}

function errorResponse(message: string, status = 400, config?: ApiRequestConfig) {
  const error = new Error(message) as Error & {
    response?: ApiResponse<unknown>;
  };

  error.response = {
    data: { message },
    status,
    statusText: message,
    headers: {},
    config: config ?? {},
    request: {},
  };

  return error;
}

function apiResponse<T>(data: T, config: ApiRequestConfig, status = 200): ApiResponse<T> {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config,
    request: {},
  };
}

function parsePath(url?: string, baseURL?: string) {
  const rawUrl = url ?? '';

  if (!rawUrl) {
    return '';
  }

  if (/^https?:\/\//i.test(rawUrl)) {
    return new URL(rawUrl).pathname;
  }

  if (rawUrl.startsWith('/')) {
    return rawUrl;
  }

  if (baseURL) {
    try {
      return new URL(rawUrl, baseURL).pathname;
    } catch {
      return rawUrl;
    }
  }

  return rawUrl;
}

async function readBody(config: ApiRequestConfig) {
  if (isFormData(config.data)) {
    const payload: JsonRecord = {};

    for (const [key, value] of config.data.entries()) {
      payload[key] = value;
    }

    return payload;
  }

  return toRecord(config.data);
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  if (value == null) {
    return [];
  }

  return [String(value)];
}

async function selectProfile(id: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id,email,nickname,profileimg,myself,gender,location,first_category,category,login_time')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function ensureProfileRow(
  id: string,
  values: Partial<SupabaseProfileRow> & { email: string; nickname?: string; location?: string; gender?: string; myself?: string; profileimg?: string; category?: string[]; first_category?: boolean; login_time?: string },
) {
  const payload = {
    id,
    email: values.email,
    nickname: values.nickname ?? '사용자',
    location: values.location ?? '',
    gender: values.gender ?? 'nothing',
    myself: values.myself ?? '안녕하세요? 잘 부탁드립니다',
    profileimg: values.profileimg ?? DEFAULT_PROFILE_IMG,
    category: values.category ?? ['전체'],
    first_category: values.first_category ?? false,
    login_time: values.login_time ?? new Date().toISOString(),
  };

  const { error } = await supabase.from('profiles').upsert(payload);

  if (error) {
    throw error;
  }
}

function toAuthResponse(profile: SupabaseProfileRow): AuthResponse {
  return {
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
  };
}

async function uploadPublicImage(bucket: string, userId: string, file: File, prefix: string) {
  const safeName = file.name.replace(/\s+/g, '-');
  const path = `${prefix}/${userId}/${Date.now()}-${safeName}`;
  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
    contentType: file.type,
  });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

async function buildProfileImage(value: FormDataEntryValue | null | undefined, userId: string) {
  if (!value) {
    return DEFAULT_PROFILE_IMG;
  }

  if (typeof value === 'string') {
    return value;
  }

  return uploadPublicImage(PROFILE_BUCKET, userId, value, 'profiles');
}

async function buildClassImage(value: FormDataEntryValue | null | undefined, classId: string) {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  return uploadPublicImage(CLASS_BUCKET, classId, value, 'classes');
}

function classRowToSummary(
  row: SupabaseClassRow,
  members: string[] = [],
  meetingDay: ClassMeetingRecord[] = [],
): ClassSummaryDto {
  return {
    _id: row.id,
    location: row.location,
    category: row.category,
    className: row.class_name,
    classTarget: row.class_target,
    member: members,
    memberCount: row.member_count,
    makeUser: row.make_user,
    thumnail: row.thumbnail ?? undefined,
    hashTag: row.hash_tag ?? [],
    meetingDay,
  };
}

function meetingRowToDto(row: SupabaseMeetingRow, classId: string, className: string, attendMember: string[]): ClassMeetingRecord {
  return {
    _id: row.id,
    classId: { _id: classId, className },
    name: row.name,
    place: row.place,
    price: row.price,
    memberCount: row.member_count,
    day: row.day,
    time: row.time,
    attendMember,
  };
}

function inviteRowToDto(row: SupabaseClassInviteRow, profile: SupabaseProfileRow | null, classInfo: ClassSummaryDto): ClassInviteRecordDto {
  return {
    _id: row.id,
    profileimg: profile?.profileimg ?? DEFAULT_PROFILE_IMG,
    nickname: profile?.nickname ?? '',
    myself: profile?.myself ?? '',
    location: profile?.location ?? '',
    info: {
      _id: classInfo._id,
      thumnail: classInfo.thumnail,
      className: classInfo.className,
      category: classInfo.category,
      hashTag: classInfo.hashTag,
      location: classInfo.location,
    },
    createdTime: row.created_at,
  };
}

async function loadClassSummaries(rows: SupabaseClassRow[], includeMeetings = false) {
  if (!rows.length) {
    return [];
  }

  const classIds = rows.map((row) => row.id);
  const { data: memberRows, error: memberError } = await supabase.from('class_members').select('class_id,user_id').in('class_id', classIds);

  if (memberError) {
    throw memberError;
  }

  const memberMap = new Map<string, string[]>();

  for (const classId of classIds) {
    memberMap.set(classId, []);
  }

  for (const row of memberRows ?? []) {
    const current = memberMap.get(row.class_id) ?? [];
    current.push(row.user_id);
    memberMap.set(row.class_id, current);
  }

  const meetingMap = new Map<string, ClassMeetingRecord[]>();

  if (includeMeetings) {
    const { data: meetingRows, error: meetingError } = await supabase
      .from('meetings')
      .select('id,class_id,name,place,price,member_count,day,time')
      .in('class_id', classIds)
      .order('created_at', { ascending: true });

    if (meetingError) {
      throw meetingError;
    }

    const meetingIds = meetingRows?.map((row) => row.id) ?? [];
    const { data: attendanceRows, error: attendanceError } = meetingIds.length
      ? await supabase.from('meeting_attendees').select('meeting_id,user_id').in('meeting_id', meetingIds)
      : { data: [], error: null };

    if (attendanceError) {
      throw attendanceError;
    }

    const attendanceMap = new Map<string, string[]>();
    for (const row of attendanceRows ?? []) {
      const current = attendanceMap.get(row.meeting_id) ?? [];
      current.push(row.user_id);
      attendanceMap.set(row.meeting_id, current);
    }

    for (const classRow of rows) {
      const classMeetings: ClassMeetingRecord[] = [];
      for (const meetingRow of meetingRows ?? []) {
        if (meetingRow.class_id !== classRow.id) {
          continue;
        }

        classMeetings.push(
          meetingRowToDto(
            meetingRow,
            classRow.id,
            classRow.class_name,
            attendanceMap.get(meetingRow.id) ?? [],
          ),
        );
      }
      meetingMap.set(classRow.id, classMeetings);
    }
  }

  return rows.map((row) =>
    classRowToSummary(row, memberMap.get(row.id) ?? [], includeMeetings ? meetingMap.get(row.id) ?? [] : []),
  );
}

async function loadClassById(id: string, includeMeetings = true) {
  const { data, error } = await supabase.from('classes').select('*').eq('id', id).maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const [summary] = await loadClassSummaries([data], includeMeetings);
  return summary;
}

async function loadClassMemberRecords(classId: string) {
  const { data: memberRows, error: memberError } = await supabase
    .from('class_members')
    .select('user_id')
    .eq('class_id', classId);

  if (memberError) {
    throw memberError;
  }

  const memberIds = memberRows?.map((row) => row.user_id) ?? [];
  const owner = await loadClassById(classId, false);

  if (!memberIds.length) {
    return [];
  }

  const { data: profileRows, error: profileError } = await supabase
    .from('profiles')
    .select('id,nickname,profileimg,myself,location')
    .in('id', memberIds);

  if (profileError) {
    throw profileError;
  }

  const profileMap = new Map((profileRows ?? []).map((row) => [row.id, row]));

  return memberIds
    .map((memberId) => {
      const profile = profileMap.get(memberId);

      return {
        _id: profile?.id ?? memberId,
        profileImg: profile?.profileimg ?? DEFAULT_PROFILE_IMG,
        mySelf: profile?.myself ?? '',
        nickName: profile?.nickname ?? '',
        classes: owner?.makeUser === memberId ? '모임장' : '회원',
      };
    })
    .sort((left, right) => Number(right.classes === '모임장') - Number(left.classes === '모임장'));
}

async function loadInviteCandidates(category: string, location: string, classId: string) {
  const { data: memberRows, error: memberError } = await supabase.from('class_members').select('user_id').eq('class_id', classId);

  if (memberError) {
    throw memberError;
  }

  const memberIds = new Set((memberRows ?? []).map((row) => row.user_id));
  const { data: inviteRows, error: inviteError } = await supabase.from('class_invites').select('user_id').eq('class_id', classId);

  if (inviteError) {
    throw inviteError;
  }

  const inviteIds = new Set((inviteRows ?? []).map((row) => row.user_id));
  const { data, error } = await supabase
    .from('profiles')
    .select('id,nickname,profileimg,myself,location,category')
    .ilike('location', `%${location}%`);

  if (error) {
    throw error;
  }

  return (data ?? [])
    .filter((profile) => {
      const categories = profile.category ?? [];
      return categories.includes(category) && !memberIds.has(profile.id) && !inviteIds.has(profile.id);
    })
    .map((profile) => ({
      _id: profile.id,
      profileimg: profile.profileimg ?? DEFAULT_PROFILE_IMG,
      nickname: profile.nickname,
      myself: profile.myself ?? '',
      location: profile.location ?? '',
    }));
}

async function loadInviteMessages(userId: string) {
  const { data: inviteRows, error: inviteError } = await supabase
    .from('class_invites')
    .select('id,class_id,user_id,created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (inviteError) {
    throw inviteError;
  }

  if (!inviteRows?.length) {
    return [];
  }

  const classIds = inviteRows.map((row) => row.class_id);
  const { data: classRows, error: classError } = await supabase.from('classes').select('*').in('id', classIds);

  if (classError) {
    throw classError;
  }

  const classMap = new Map<string, ClassSummaryDto>();
  for (const row of classRows ?? []) {
    classMap.set(row.id, classRowToSummary(row));
  }

  return inviteRows.map((row) => {
    const info = classMap.get(row.class_id);
    return inviteRowToDto(
      row,
      null,
      info ?? {
        _id: row.class_id,
        location: '',
        category: '',
        className: '',
        classTarget: '',
        member: [],
        memberCount: 0,
        makeUser: '',
        thumnail: undefined,
        hashTag: [],
        meetingDay: [],
      },
    );
  });
}

async function loadChatMessages(classId: string, pages: number) {
  const from = pages * 10;
  const to = from + 9;
  const { data, error } = await supabase
    .from('chat_messages')
    .select('id,class_id,user_id,message,created_at')
    .eq('class_id', classId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  if (!data?.length) {
    return [];
  }

  const userIds = [...new Set(data.map((row) => row.user_id))];
  const { data: profileRows, error: profileError } = await supabase
    .from('profiles')
    .select('id,nickname,profileimg')
    .in('id', userIds);

  if (profileError) {
    throw profileError;
  }

  const profileMap = new Map((profileRows ?? []).map((row) => [row.id, row]));

  return [...data]
    .reverse()
    .map((row) => ({
      _id: row.id,
      message: row.message,
      createdAt: row.created_at,
      userId: {
        _id: row.user_id,
        nickname: profileMap.get(row.user_id)?.nickname ?? '',
        profileimg: profileMap.get(row.user_id)?.profileimg ?? DEFAULT_PROFILE_IMG,
      },
    }));
}

async function countUnreadMessages(classId: string, time: string) {
  const date = Number.isNaN(Number(time)) ? new Date(time) : new Date(Number(time));
  const iso = Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();

  const { count, error } = await supabase
    .from('chat_messages')
    .select('id', { head: true, count: 'exact' })
    .eq('class_id', classId)
    .gt('created_at', iso);

  if (error) {
    throw error;
  }

  return count ?? 0;
}

function extractFormValue(formData: Record<string, unknown>, key: string) {
  const value = formData[key];
  if (value == null) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  return value;
}

type ClassSummaryDto = {
  _id: string;
  location: string;
  category: string;
  className: string;
  classTarget: string;
  member: string[];
  memberCount: number;
  makeUser: string;
  thumnail?: string;
  hashTag: string[];
  meetingDay: ClassMeetingRecord[];
};

type ClassInviteRecordDto = {
  _id: string;
  profileimg?: string;
  nickname?: string;
  myself?: string;
  location?: string;
  info?: {
    _id: string;
    thumnail?: string;
    className: string;
    category: string;
    hashTag: string[];
    location: string;
  };
  createdTime?: string;
};

type ClassMeetingRecord = {
  _id: string;
  classId?: {
    _id: string;
    className: string;
  };
  name: string;
  place: string;
  price: string;
  memberCount: number;
  day: string;
  time: string;
  attendMember: string[];
};

async function handleAuthSignup(config: ApiRequestConfig, body: JsonRecord) {
  const email = String(body.email ?? '');
  const password = String(body.password ?? '');
  const nickname = String(body.nickname ?? '');
  const gender = String(body.gender ?? 'nothing');
  const location = String(body.location ?? '');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
        gender,
        location,
        myself: '안녕하세요? 잘 부탁드립니다',
        profileimg: DEFAULT_PROFILE_IMG,
      },
    },
  });

  if (error) {
    throw errorResponse(error.message, 400, config);
  }

  if (data.user) {
    await ensureProfileRow(data.user.id, {
      email,
      nickname,
      gender,
      location,
      myself: '안녕하세요? 잘 부탁드립니다',
      profileimg: DEFAULT_PROFILE_IMG,
      first_category: false,
      category: ['전체'],
    });
  }

  return { success: true };
}

async function handleAuthLogin(config: ApiRequestConfig, body: JsonRecord) {
  const email = String(body.email ?? '');
  const password = String(body.password ?? '');

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    throw errorResponse('로그인에 실패하셨습니다.', 403, config);
  }

  if (data.session) {
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });

    if (sessionError) {
      throw sessionError;
    }
  }

  const currentProfile = await selectProfile(data.user.id);

  if (!currentProfile) {
    await ensureProfileRow(data.user.id, {
      email,
      nickname: data.user.user_metadata?.nickname ?? email.split('@')[0] ?? '사용자',
      gender: data.user.user_metadata?.gender ?? 'nothing',
      location: data.user.user_metadata?.location ?? '',
      myself: data.user.user_metadata?.myself ?? '안녕하세요? 잘 부탁드립니다',
      profileimg: data.user.user_metadata?.profileimg ?? DEFAULT_PROFILE_IMG,
      category: ['전체'],
      first_category: false,
      login_time: new Date().toISOString(),
    });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id,email,nickname,profileimg,myself,gender,location,first_category,category,login_time')
    .eq('id', data.user.id)
    .single();

  if (!profile) {
    throw errorResponse('프로필을 찾을 수 없습니다.', 500, config);
  }

  await supabase.from('profiles').update({ login_time: new Date().toISOString() }).eq('id', data.user.id);

  return toAuthResponse(profile);
}

async function handleAuthCheck() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return { loginSuccess: false };
  }

  const profile = await selectProfile(data.user.id);

  if (!profile) {
    await ensureProfileRow(data.user.id, {
      email: data.user.email ?? '',
      nickname: data.user.user_metadata?.nickname ?? data.user.email?.split('@')[0] ?? '사용자',
      gender: data.user.user_metadata?.gender ?? 'nothing',
      location: data.user.user_metadata?.location ?? '',
      myself: data.user.user_metadata?.myself ?? '안녕하세요? 잘 부탁드립니다',
      profileimg: data.user.user_metadata?.profileimg ?? DEFAULT_PROFILE_IMG,
      category: ['전체'],
      first_category: false,
      login_time: new Date().toISOString(),
    });

    const recreated = await selectProfile(data.user.id);
    if (!recreated) {
      return { loginSuccess: false };
    }

    return toAuthResponse(recreated);
  }

  return toAuthResponse(profile);
}

async function handleAuthLogout() {
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    await supabase.from('profiles').update({ login_time: new Date().toISOString() }).eq('id', data.user.id);
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }

  return {};
}

async function handleAuthSelectCategory(body: JsonRecord) {
  const userId = String(body._id ?? '');
  const clickCategory = toStringArray(body.clickCategory);
  const category = ['전체', ...clickCategory];

  const { error } = await supabase
    .from('profiles')
    .update({ first_category: true, category })
    .eq('id', userId);

  if (error) {
    throw error;
  }

  return '굿';
}

async function handleAuthModify(config: ApiRequestConfig, body: JsonRecord) {
  const id = String(body.id ?? '');
  const gender = String(body.gender ?? 'nothing');
  const myself = String(body.myself ?? '');
  const nickname = String(body.nickname ?? '');
  const image = extractFormValue(body, 'image');
  const profileimg = await buildProfileImage(image ? (image as FormDataEntryValue) : null, id);

  const { error } = await supabase
    .from('profiles')
    .update({
      gender,
      myself,
      nickname,
      profileimg,
    })
    .eq('id', id);

  if (error) {
    throw error;
  }

  return {};
}

async function handleAuthCategoryModify(body: JsonRecord) {
  const userId = String(body.userId ?? '');
  const selectCategory = toStringArray(body.selectCategry);

  const { error } = await supabase.from('profiles').update({ category: selectCategory }).eq('id', userId);

  if (error) {
    throw error;
  }

  return { success: '성공', doc: {} };
}

async function handleClassMake(body: JsonRecord) {
  const insertPayload = {
    location: String(body.location ?? ''),
    category: String(body.category ?? ''),
    class_name: String(body.className ?? ''),
    class_target: String(body.classTarget ?? ''),
    member_count: Number(body.memberCount ?? 20),
    make_user: String(body.makeUser ?? ''),
    thumbnail: null,
    hash_tag: toStringArray(body.hashTag),
  };

  const { data, error } = await supabase.from('classes').insert(insertPayload).select('id').single();

  if (error || !data) {
    throw error ?? new Error('모임 생성에 실패했습니다.');
  }

  const classId = data.id;
  const { error: memberError } = await supabase.from('class_members').upsert({
    class_id: classId,
    user_id: String(body.makeUser ?? ''),
  });

  if (memberError) {
    throw memberError;
  }

  return classId;
}

async function handleClassInfo(id: string) {
  const classInfo = await loadClassById(id, true);
  return classInfo ? [classInfo] : [];
}

async function handleClassMembers(id: string) {
  return loadClassMemberRecords(id);
}

async function handleClassInviteCandidates(category: string, location: string, classId: string) {
  return loadInviteCandidates(category, location, classId);
}

async function handleClassInviteSend(body: JsonRecord) {
  const checkList = toStringArray(body.checkList);
  const classId = String(body.classId ?? '');

  if (!checkList.length) {
    return '굿';
  }

  const rows = checkList.map((userId) => ({
    class_id: classId,
    user_id: userId,
  }));

  const { error } = await supabase.from('class_invites').upsert(rows, { onConflict: 'class_id,user_id' });

  if (error) {
    throw error;
  }

  return '굿';
}

async function handleClassInviteMessages(userId: string) {
  const inviteMessages = await loadInviteMessages(userId);
  return { inviteMessage: inviteMessages };
}

async function handleClassJoin(body: JsonRecord) {
  const userId = String(body.userId ?? '');
  const classId = String(body.classId ?? '');

  const { error } = await supabase.from('class_members').upsert({ class_id: classId, user_id: userId }, { onConflict: 'class_id,user_id' });

  if (error) {
    throw error;
  }

  await supabase.from('class_invites').delete().match({ class_id: classId, user_id: userId });

  return {};
}

async function handleClassSecession(body: JsonRecord) {
  const userId = String(body.userId ?? '');
  const classId = String(body.classId ?? '');
  const classInfo = await loadClassById(classId, false);

  if (!classInfo) {
    return '성공';
  }

  if (classInfo.makeUser === userId) {
    const { error } = await supabase.from('classes').delete().eq('id', classId);
    if (error) {
      throw error;
    }
    return '성공';
  }

  const { error } = await supabase.from('class_members').delete().match({ class_id: classId, user_id: userId });
  if (error) {
    throw error;
  }

  return {};
}

async function handleClassModify(config: ApiRequestConfig, body: JsonRecord) {
  const classId = String(body.id ?? '');
  const className = body.className == null ? undefined : String(body.className);
  const classTarget = body.classTarget == null ? undefined : String(body.classTarget);
  const hasImage = Object.prototype.hasOwnProperty.call(body, 'image');
  const image = hasImage ? extractFormValue(body, 'image') : null;

  const updatePayload: JsonRecord = {};

  if (typeof className === 'string') {
    updatePayload.class_name = className;
  }

  if (typeof classTarget === 'string') {
    updatePayload.class_target = classTarget;
  }

  if (hasImage) {
    const thumbnail = image ? await buildClassImage(image as FormDataEntryValue, classId) : null;
    updatePayload.thumbnail = thumbnail;
  }

  const { error } = await supabase.from('classes').update(updatePayload).eq('id', classId);

  if (error) {
    throw error;
  }

  return {};
}

async function handleClassList(body: JsonRecord) {
  const pages = Number(body.pages ?? 0);
  const start = pages * 5;
  const end = start + 4;
  const useSearchCategory = body.useSearchCategory == null ? '' : String(body.useSearchCategory);
  const selectCategory = body.selectCategory == null ? '전체' : String(body.selectCategory);

  let query = supabase.from('classes').select('*').order('created_at', { ascending: true });

  if (useSearchCategory) {
    query = query.overlaps('hash_tag', [useSearchCategory]);
  } else if (selectCategory !== '전체') {
    query = query.eq('category', selectCategory);
  }

  const { data, error } = await query.range(start, end);

  if (error) {
    throw error;
  }

  const summaries = await loadClassSummaries((data ?? []) as SupabaseClassRow[], false);
  if (useSearchCategory && !summaries.length) {
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('classes')
      .select('*')
      .eq('category', useSearchCategory)
      .order('created_at', { ascending: true })
      .range(start, end);

    if (fallbackError) {
      throw fallbackError;
    }

    return loadClassSummaries((fallbackData ?? []) as SupabaseClassRow[], false);
  }

  return summaries;
}

async function handleClassListMy(id: string) {
  const { data: memberRows, error: memberError } = await supabase.from('class_members').select('class_id').eq('user_id', id);

  if (memberError) {
    throw memberError;
  }

  const classIds = memberRows?.map((row) => row.class_id) ?? [];
  if (!classIds.length) {
    return [];
  }

  const { data: classRows, error: classError } = await supabase.from('classes').select('*').in('id', classIds).order('created_at', { ascending: true });

  if (classError) {
    throw classError;
  }

  return loadClassSummaries((classRows ?? []) as SupabaseClassRow[], true);
}

async function handleMeetingList(classId: string) {
  const { data: classInfo, error: classError } = await supabase.from('classes').select('id,class_name').eq('id', classId).maybeSingle();
  if (classError) {
    throw classError;
  }

  const { data: meetingRows, error } = await supabase
    .from('meetings')
    .select('id,class_id,name,place,price,member_count,day,time')
    .eq('class_id', classId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  const meetingIds = meetingRows?.map((row) => row.id) ?? [];
  const { data: attendanceRows, error: attendanceError } = meetingIds.length
    ? await supabase.from('meeting_attendees').select('meeting_id,user_id').in('meeting_id', meetingIds)
    : { data: [], error: null };

  if (attendanceError) {
    throw attendanceError;
  }

  const attendanceMap = new Map<string, string[]>();
  for (const row of attendanceRows ?? []) {
    const current = attendanceMap.get(row.meeting_id) ?? [];
    current.push(row.user_id);
    attendanceMap.set(row.meeting_id, current);
  }

  return (meetingRows ?? []).map((row) =>
    meetingRowToDto(row, classId, classInfo?.class_name ?? '', attendanceMap.get(row.id) ?? []),
  );
}

async function handleMeetingMake(body: JsonRecord) {
  const dayValue = body.day instanceof Date ? body.day.toISOString() : String(body.day ?? new Date().toISOString());
  const { data, error } = await supabase
    .from('meetings')
    .insert({
      class_id: String(body.classId ?? ''),
      name: String(body.name ?? ''),
      place: String(body.place ?? ''),
      price: String(body.price ?? ''),
      member_count: Number(body.memberCount ?? 20),
      day: dayValue,
      time: String(body.time ?? format(new Date(), 'HH:mm')),
    })
    .select('id')
    .single();

  if (error || !data) {
    throw error ?? new Error('정모 생성에 실패했습니다.');
  }

  return data;
}

async function handleMeetingAttend(body: JsonRecord) {
  const { error } = await supabase.from('meeting_attendees').upsert({
    meeting_id: String(body._id ?? ''),
    user_id: String(body.userId ?? ''),
  });

  if (error) {
    throw error;
  }

  return {};
}

async function handleMeetingDelete(body: JsonRecord) {
  const { error } = await supabase.from('meetings').delete().eq('id', String(body._id ?? ''));

  if (error) {
    throw error;
  }

  return {};
}

async function handleChatMessages(classId: string, pages: number) {
  return loadChatMessages(classId, pages);
}

async function handleChatUnreads(classId: string, time: string) {
  return { count: await countUnreadMessages(classId, time) };
}

async function handleApiRequest(config: ApiRequestConfig) {
  if (!hasSupabaseConfig || !supabase) {
    return null;
  }

  const pathname = parsePath(config.url, config.baseURL);

  if (!pathname.startsWith('/api/')) {
    return null;
  }

  const body = await readBody(config);
  const method = (config.method ?? 'get').toLowerCase();

  if (method === 'post' && pathname === '/api/auth/signup') {
    return handleAuthSignup(config, body);
  }

  if (method === 'post' && pathname === '/api/auth/login') {
    return handleAuthLogin(config, body);
  }

  if (method === 'get' && pathname === '/api/auth/auth-check') {
    return handleAuthCheck();
  }

  if (method === 'get' && pathname === '/api/auth/logout') {
    return handleAuthLogout();
  }

  if (method === 'post' && pathname === '/api/auth/select-category') {
    return handleAuthSelectCategory(body);
  }

  if (method === 'post' && pathname === '/api/auth/modify') {
    return handleAuthModify(config, body);
  }

  if (method === 'post' && pathname === '/api/auth/category/modify') {
    return handleAuthCategoryModify(body);
  }

  if (method === 'post' && pathname === '/api/class/make') {
    return handleClassMake(body);
  }

  if (method === 'get' && pathname.startsWith('/api/class/info/member/')) {
    return handleClassMembers(pathname.split('/').slice(-1)[0] ?? '');
  }

  if (method === 'get' && pathname.startsWith('/api/class/info/')) {
    const id = pathname.split('/').slice(-1)[0] ?? '';
    return handleClassInfo(id);
  }

  if (method === 'get' && pathname.startsWith('/api/class/invite/member/')) {
    const parts = pathname.split('/');
    return handleClassInviteCandidates(parts[parts.length - 3] ?? '', parts[parts.length - 2] ?? '', parts[parts.length - 1] ?? '');
  }

  if (method === 'post' && pathname === '/api/class/invite/send') {
    return handleClassInviteSend(body);
  }

  if (method === 'get' && pathname.includes('/invite/message')) {
    const id = pathname.split('/')[3] ?? '';
    return handleClassInviteMessages(id);
  }

  if (method === 'post' && pathname === '/api/class/info/join/member') {
    return handleClassJoin(body);
  }

  if (method === 'post' && pathname === '/api/class/info/secession/member') {
    return handleClassSecession(body);
  }

  if (method === 'post' && pathname === '/api/class/info/admin/modify') {
    return handleClassModify(config, body);
  }

  if (method === 'post' && pathname === '/api/class/list') {
    return handleClassList(body);
  }

  if (method === 'get' && pathname.startsWith('/api/class/list/my/')) {
    return handleClassListMy(pathname.split('/').slice(-1)[0] ?? '');
  }

  if (method === 'get' && pathname.startsWith('/api/meeting/list/')) {
    return handleMeetingList(pathname.split('/').slice(-1)[0] ?? '');
  }

  if (method === 'post' && pathname === '/api/meeting/make') {
    return handleMeetingMake(body);
  }

  if (method === 'post' && pathname === '/api/meeting/attend') {
    return handleMeetingAttend(body);
  }

  if (method === 'post' && pathname === '/api/meeting/delete') {
    return handleMeetingDelete(body);
  }

  if (method === 'get' && pathname.startsWith('/api/chat/message/')) {
    const parts = pathname.split('/');
    const classId = parts[4] ?? '';
    const pages = parts[5] ?? '0';
    return handleChatMessages(classId ?? '', Number(pages ?? '0'));
  }

  if (method === 'get' && pathname.includes('/unreads/')) {
    const parts = pathname.split('/');
    return handleChatUnreads(parts[3] ?? '', parts[parts.length - 1] ?? '');
  }

  return null;
}

export async function requestApi<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
  const response = await handleApiRequest(config);

  if (response === null) {
    throw new Error(`Unhandled API request: ${config.method ?? 'get'} ${config.url ?? ''}`);
  }

  return apiResponse(response as T, config);
}

export const installApiBridge = () => undefined;

export function getApi<T>(url: string, config?: Omit<ApiRequestConfig, 'method' | 'url'>) {
  return requestApi<T>({ ...config, method: 'get', url });
}

export function postApi<T>(url: string, data?: unknown, config?: Omit<ApiRequestConfig, 'method' | 'url' | 'data'>) {
  return requestApi<T>({ ...config, method: 'post', url, data });
}
