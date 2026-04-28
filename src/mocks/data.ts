import type { ChatMessage } from '@/types/domain/chat';
import type { ClassInviteRecord, ClassMemberRecord, ClassMeetingRecord, ClassSummary } from '@/types/domain/class';
import type { AuthResponse } from '@/types/domain/user';

type MockAccount = {
  email: string;
  password: string;
  user: AuthResponse;
};

type MockState = {
  loggedIn: boolean;
  currentUser: AuthResponse;
  accounts: MockAccount[];
  classes: ClassSummary[];
  members: Record<string, ClassMemberRecord[]>;
  chats: Record<string, ChatMessage[]>;
  inviteMessages: Record<string, ClassInviteRecord[]>;
  inviteTargets: Record<string, ClassInviteRecord[]>;
  nextUserId: number;
  nextClassId: number;
  nextMeetingId: number;
  nextInviteId: number;
  nextChatId: number;
};

const now = new Date();

const makeDate = (offsetDays: number, hour = 12) => {
  const date = new Date(now);
  date.setDate(date.getDate() + offsetDays);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

const makeUser = (user: Partial<AuthResponse> & Pick<AuthResponse, '_id' | 'email' | 'nickname' | 'gender' | 'location'>): AuthResponse => ({
  ...user,
  loginSuccess: true,
  firstCategory: user.firstCategory ?? false,
  loginTime: user.loginTime ?? new Date().toISOString(),
  myself: user.myself ?? '',
  nickName: user.nickName ?? user.nickname ?? '',
  profileimg: user.profileimg ?? user.profileImg ?? 'https://placehold.co/240x240/png?text=Profile',
  profileImg: user.profileImg ?? user.profileimg ?? 'https://placehold.co/240x240/png?text=Profile',
  category: user.category ?? [],
  message: user.message ?? 'success',
});

const currentUser = makeUser({
  _id: 'user-1',
  email: 'demo@idol.chat',
  nickname: '데모유저',
  gender: 'women',
  location: '서울 강남구 삼성동',
  myself: '모킹 환경에서 기본 흐름을 테스트하는 계정입니다.',
  category: ['여자아이돌', '영화', '유튜버'],
  firstCategory: true,
  loginTime: makeDate(-1),
});

const alice = makeUser({
  _id: 'user-2',
  email: 'alice@idol.chat',
  nickname: '앨리스',
  gender: 'women',
  location: '서울 강남구 역삼동',
  myself: '아이돌 콘서트와 굿즈 수집을 좋아합니다.',
});

const bob = makeUser({
  _id: 'user-3',
  email: 'bob@idol.chat',
  nickname: '밥',
  gender: 'men',
  location: '서울 마포구 서교동',
  myself: '주말엔 영화와 애니를 봅니다.',
});

const chris = makeUser({
  _id: 'user-4',
  email: 'chris@idol.chat',
  nickname: '크리스',
  gender: 'men',
  location: '서울 송파구 잠실동',
  myself: '유튜브와 공연 후기를 자주 봅니다.',
});

const dana = makeUser({
  _id: 'user-5',
  email: 'dana@idol.chat',
  nickname: '다나',
  gender: 'women',
  location: '서울 강남구 논현동',
  myself: '카페에서 덕질 모임하는 걸 좋아합니다.',
});

const classOneId = 'class-1';
const classTwoId = 'class-2';
const classThreeId = 'class-3';

const classOneMeetingId = 'meeting-1';
const classTwoMeetingId = 'meeting-2';
const classThreeMeetingId = 'meeting-3';

const classOne: ClassSummary = {
  _id: classOneId,
  className: '에스파 카페 모임',
  classTarget: '에스파 컴백 이야기를 나누고 카페에서 가볍게 만나는 모임입니다.',
  location: '서울 강남구 삼성동',
  category: '여자아이돌',
  hashTag: ['에스파', '카페', '수다'],
  member: ['user-1', 'user-2', 'user-4'],
  thumnail: 'https://placehold.co/600x400/png?text=Aespa',
  makeUser: 'user-1',
  meetingDay: [
    {
      _id: classOneMeetingId,
      name: '에스파 컴백 기념 수다회',
      day: makeDate(1, 19),
      time: '19:00',
      place: '강남역 근처 카페',
      price: '12000',
      attendMember: ['user-1', 'user-2'],
      classId: { _id: classOneId, className: '에스파 카페 모임' },
    },
    {
      _id: 'meeting-1-2',
      name: '앨범 오픈런',
      day: makeDate(7, 14),
      time: '14:30',
      place: '삼성동 카페',
      price: '15000',
      attendMember: ['user-1'],
      classId: { _id: classOneId, className: '에스파 카페 모임' },
    },
  ],
};

const classTwo: ClassSummary = {
  _id: classTwoId,
  className: '영화 같이 보기',
  classTarget: '한 달에 한 번 영화 보고 감상 나누는 모임',
  location: '서울 마포구 서교동',
  category: '영화',
  hashTag: ['영화', 'OTT', '후기'],
  member: ['user-1', 'user-3'],
  thumnail: 'https://placehold.co/600x400/png?text=Movie',
  makeUser: 'user-3',
  meetingDay: [
    {
      _id: classTwoMeetingId,
      name: '4월 신작 영화 관람',
      day: makeDate(3, 18),
      time: '18:00',
      place: '홍대입구 영화관',
      price: '14000',
      attendMember: ['user-1', 'user-3'],
      classId: { _id: classTwoId, className: '영화 같이 보기' },
    },
  ],
};

const classThree: ClassSummary = {
  _id: classThreeId,
  className: '유튜버 덕질방',
  classTarget: '유튜버 영상 추천과 오프라인 번개',
  location: '서울 송파구 잠실동',
  category: '유튜버',
  hashTag: ['유튜브', '번개', '추천'],
  member: ['user-4', 'user-5'],
  thumnail: 'https://placehold.co/600x400/png?text=YouTube',
  makeUser: 'user-4',
  meetingDay: [],
};

const initialChats: Record<string, ChatMessage[]> = {
  [classOneId]: [
    {
      _id: 'chat-1',
      createdAt: makeDate(-2, 21),
      message: '오늘 컴백 무대 봤어요?',
      userId: { _id: 'user-2', nickname: '앨리스', profileimg: alice.profileimg },
    },
    {
      _id: 'chat-2',
      createdAt: makeDate(-2, 21),
      message: '봤어요. 안무 최고였어요!',
      userId: { _id: 'user-1', nickname: '데모유저', profileimg: currentUser.profileimg },
    },
    {
      _id: 'chat-3',
      createdAt: makeDate(-1, 20),
      message: '이번 주 카페 모임 장소 정했나요?',
      userId: { _id: 'user-4', nickname: '크리스', profileimg: chris.profileimg },
    },
  ],
  [classTwoId]: [
    {
      _id: 'chat-4',
      createdAt: makeDate(-3, 17),
      message: '이번 주에 무슨 영화 볼까요?',
      userId: { _id: 'user-3', nickname: '밥', profileimg: bob.profileimg },
    },
  ],
};

const initialInviteMessages: Record<string, ClassInviteRecord[]> = {
  [currentUser._id ?? 'user-1']: [
    {
      _id: 'invite-1',
      createdTime: makeDate(-1, 13),
      info: classTwo,
    },
    {
      _id: 'invite-2',
      createdTime: makeDate(-4, 11),
      info: classThree,
    },
  ],
};

const initialInviteTargets: Record<string, ClassInviteRecord[]> = {
  [classOneId]: [
    {
      _id: bob._id ?? 'user-3',
      profileimg: bob.profileimg,
      nickname: bob.nickname,
      myself: true,
      location: bob.location,
    },
    {
      _id: dana._id ?? 'user-5',
      profileimg: dana.profileimg,
      nickname: dana.nickname,
      myself: false,
      location: dana.location,
    },
  ],
  [classTwoId]: [
    {
      _id: alice._id ?? 'user-2',
      profileimg: alice.profileimg,
      nickname: alice.nickname,
      myself: true,
      location: alice.location,
    },
    {
      _id: chris._id ?? 'user-4',
      profileimg: chris.profileimg,
      nickname: chris.nickname,
      myself: false,
      location: chris.location,
    },
  ],
};

const initialMembers: Record<string, ClassMemberRecord[]> = structuredClone({
  [classOneId]: [
    {
      _id: currentUser._id,
      profileImg: currentUser.profileimg,
      nickName: currentUser.nickname,
      mySelf: currentUser.myself,
      classes: '모임장',
      location: currentUser.location,
    },
    {
      _id: alice._id,
      profileImg: alice.profileimg,
      nickName: alice.nickname,
      mySelf: alice.myself,
      classes: '회원',
      location: alice.location,
    },
    {
      _id: chris._id,
      profileImg: chris.profileimg,
      nickName: chris.nickname,
      mySelf: chris.myself,
      classes: '회원',
      location: chris.location,
    },
  ],
  [classTwoId]: [
    {
      _id: bob._id,
      profileImg: bob.profileimg,
      nickName: bob.nickname,
      mySelf: bob.myself,
      classes: '모임장',
      location: bob.location,
    },
    {
      _id: currentUser._id,
      profileImg: currentUser.profileimg,
      nickName: currentUser.nickname,
      mySelf: currentUser.myself,
      classes: '회원',
      location: currentUser.location,
    },
  ],
  [classThreeId]: [
    {
      _id: chris._id,
      profileImg: chris.profileimg,
      nickName: chris.nickname,
      mySelf: chris.myself,
      classes: '모임장',
      location: chris.location,
    },
    {
      _id: dana._id,
      profileImg: dana.profileimg,
      nickName: dana.nickname,
      mySelf: dana.myself,
      classes: '회원',
      location: dana.location,
    },
  ],
});

export const mockState: MockState = {
  loggedIn: false,
  currentUser,
  accounts: [
    {
      email: currentUser.email ?? 'demo@idol.chat',
      password: 'Password1!',
      user: currentUser,
    },
  ],
  classes: [classOne, classTwo, classThree],
  members: structuredClone(initialMembers),
  chats: initialChats,
  inviteMessages: initialInviteMessages,
  inviteTargets: initialInviteTargets,
  nextUserId: 100,
  nextClassId: 100,
  nextMeetingId: 100,
  nextInviteId: 100,
  nextChatId: 100,
};

export const resetMockState = () => {
  mockState.loggedIn = false;
  mockState.currentUser = structuredClone(currentUser);
  mockState.accounts = [
    {
      email: currentUser.email ?? 'demo@idol.chat',
      password: 'Password1!',
      user: currentUser,
    },
  ];
  mockState.classes = structuredClone([classOne, classTwo, classThree]);
  mockState.members = structuredClone(initialMembers);
  mockState.chats = structuredClone(initialChats);
  mockState.inviteMessages = structuredClone(initialInviteMessages);
  mockState.inviteTargets = structuredClone(initialInviteTargets);
  mockState.nextUserId = 100;
  mockState.nextClassId = 100;
  mockState.nextMeetingId = 100;
  mockState.nextInviteId = 100;
  mockState.nextChatId = 100;
};

const sortClasses = (classes: ClassSummary[]) => [...classes].sort((a, b) => a.className.localeCompare(b.className));

export const getActiveUser = () => (mockState.loggedIn ? mockState.currentUser : null);

export const setActiveUser = (user: AuthResponse | null) => {
  if (!user) {
    mockState.loggedIn = false;
    return;
  }

  mockState.loggedIn = true;
  mockState.currentUser = {
    ...user,
    loginSuccess: true,
    firstCategory: user.firstCategory ?? true,
    category: user.category ?? [],
    nickName: user.nickName ?? user.nickname ?? '',
    profileImg: user.profileImg ?? user.profileimg ?? '',
    profileimg: user.profileimg ?? user.profileImg ?? '',
  };
};

export const updateCurrentUser = (patch: Partial<AuthResponse>) => {
  mockState.currentUser = {
    ...mockState.currentUser,
    ...patch,
    nickName: patch.nickName ?? patch.nickname ?? mockState.currentUser.nickName,
    profileImg: patch.profileImg ?? patch.profileimg ?? mockState.currentUser.profileImg,
    profileimg: patch.profileimg ?? patch.profileImg ?? mockState.currentUser.profileimg,
    category: patch.category ?? mockState.currentUser.category,
  };
  mockState.loggedIn = true;
};

export const createUserFromSignup = (input: {
  email: string;
  password: string;
  nickname: string;
  gender: string;
  location: string;
}) => {
  const existing = mockState.accounts.find((account) => account.email === input.email);
  if (existing) {
    return { success: false, message: '이미 가입된 이메일입니다.' };
  }

  const userId = `user-${mockState.nextUserId++}`;
  const newUser = makeUser({
    _id: userId,
    email: input.email,
    nickname: input.nickname,
    gender: input.gender,
    location: input.location,
    myself: '',
    category: [],
    firstCategory: false,
    loginTime: new Date().toISOString(),
  });

  mockState.accounts.push({
    email: input.email,
    password: input.password,
    user: newUser,
  });
  mockState.inviteMessages[userId] = [];
  return { success: true };
};

export const authenticate = (email: string, password: string) => {
  const account = mockState.accounts.find((item) => item.email === email && item.password === password);
  if (!account) {
    return null;
  }

  setActiveUser(account.user);
  return mockState.currentUser;
};

export const logout = () => {
  mockState.loggedIn = false;
};

export const getClassesForList = (params: { selectCategory?: string; useSearchCategory?: string; pages?: number }) => {
  const pageSize = 10;
  const page = params.pages ?? 0;
  const search = params.useSearchCategory?.trim();
  const category = params.selectCategory?.trim();

  const filtered = sortClasses(mockState.classes).filter((item) => {
    if (search) {
      const haystack = [item.className, item.classTarget, item.category, item.location, ...item.hashTag].join(' ');
      return haystack.includes(search);
    }

    if (category && category !== '전체') {
      return item.category === category;
    }

    return true;
  });

  return filtered.slice(page * pageSize, page * pageSize + pageSize);
};

export const getMyClasses = (userId?: string) => {
  if (!userId) {
    return [];
  }

  return sortClasses(mockState.classes).filter((item) => item.member.includes(userId));
};

export const getClassById = (id?: string) => {
  if (!id) {
    return null;
  }

  return mockState.classes.find((item) => item._id === id) ?? null;
};

export const getMembersByClassId = (id?: string) => (id ? mockState.members[id] ?? [] : []);

export const getInviteTargets = (category?: string, location?: string, classId?: string) => {
  const base = (classId ? mockState.inviteTargets[classId] ?? [] : []).filter((candidate) => candidate._id !== mockState.currentUser._id);

  return base.filter((candidate) => {
    if (location && candidate.location && !candidate.location.includes(location)) {
      return false;
    }

    if (category) {
      const classInfo = mockState.classes.find((item) => item._id === classId);
      if (classInfo && classInfo.category !== category) {
        return false;
      }
    }

    return true;
  });
};

export const getInviteMessages = (userId?: string) => {
  if (!userId) {
    return [];
  }

  return mockState.inviteMessages[userId] ?? [];
};

export const getChatMessages = (classId?: string, page = 0) => {
  if (!classId) {
    return [];
  }

  const pageSize = 10;
  const messages = mockState.chats[classId] ?? [];
  const start = page * pageSize;
  const end = start + pageSize;

  return messages.slice(start, end);
};

export const getUnreadCount = (classId?: string, date?: string) => {
  if (!classId) {
    return 0;
  }

  const messages = mockState.chats[classId] ?? [];
  if (!date) {
    return messages.length;
  }

  const since = new Date(date).getTime();
  return messages.filter((message) => new Date(message.createdAt ?? 0).getTime() > since).length;
};

export const makeClass = (input: {
  location: string;
  category: string;
  className: string;
  classTarget: string;
  memberCount: number;
  makeUser?: string;
  hashTag?: string[];
}) => {
  const classId = `class-${mockState.nextClassId++}`;
  const nextClass: ClassSummary = {
    _id: classId,
    className: input.className,
    classTarget: input.classTarget,
    location: input.location,
    category: input.category,
    hashTag: input.hashTag ?? [],
    member: [input.makeUser ?? mockState.currentUser._id ?? 'user-1'],
    thumnail: 'https://placehold.co/600x400/png?text=New+Class',
    makeUser: input.makeUser ?? mockState.currentUser._id,
    meetingDay: [],
  };

  mockState.classes = sortClasses([...mockState.classes, nextClass]);
  mockState.members[classId] = [
    {
      _id: input.makeUser ?? mockState.currentUser._id,
      profileImg: mockState.currentUser.profileimg,
      nickName: mockState.currentUser.nickname,
      mySelf: mockState.currentUser.myself,
      classes: '모임장',
      location: mockState.currentUser.location,
    },
  ];
  mockState.chats[classId] = [];
  mockState.inviteTargets[classId] = [];

  return classId;
};

export const updateClassInfo = (input: { id?: string; className?: string; classTarget?: string; image?: string | File }) => {
  const classInfo = getClassById(input.id);
  if (!classInfo) {
    return null;
  }

  if (typeof input.className === 'string') {
    classInfo.className = input.className;
  }

  if (typeof input.classTarget === 'string') {
    classInfo.classTarget = input.classTarget;
  }

  if (typeof input.image === 'string') {
    classInfo.thumnail = input.image;
  } else if (input.image instanceof File) {
    classInfo.thumnail = `https://placehold.co/600x400/png?text=${encodeURIComponent(input.image.name || 'Updated')}`;
  }

  return classInfo;
};

export const updateUserCategories = (selectCategory?: string[]) => {
  mockState.currentUser = {
    ...mockState.currentUser,
    category: selectCategory ?? [],
    firstCategory: true,
  };
  mockState.loggedIn = true;
};

export const joinClass = (userId?: string, classId?: string) => {
  const classInfo = getClassById(classId);
  if (!classInfo || !userId) {
    return;
  }

  if (!classInfo.member.includes(userId)) {
    classInfo.member.push(userId);
  }

  const members = mockState.members[classId ?? ''] ?? [];
  if (!members.find((member) => member._id === userId)) {
    members.push({
      _id: userId,
      profileImg: mockState.currentUser.profileimg,
      nickName: mockState.currentUser.nickname,
      mySelf: mockState.currentUser.myself,
      classes: '회원',
      location: mockState.currentUser.location,
    });
    mockState.members[classId ?? ''] = members;
  }
};

export const leaveClass = (userId?: string, classId?: string) => {
  const classInfo = getClassById(classId);
  if (!classInfo || !userId) {
    return;
  }

  classInfo.member = classInfo.member.filter((member) => member !== userId);
  mockState.members[classId ?? ''] = (mockState.members[classId ?? ''] ?? []).filter((member) => member._id !== userId);
};

export const addMeeting = (input: {
  name: string;
  place: string;
  price: string;
  memberCount: number;
  day?: Date | null;
  time: string;
  classId?: string;
}) => {
  const classInfo = getClassById(input.classId);
  if (!classInfo) {
    return null;
  }

  const meeting: ClassMeetingRecord = {
    _id: `meeting-${mockState.nextMeetingId++}`,
    name: input.name,
    day: input.day?.toISOString() ?? new Date().toISOString(),
    time: input.time,
    place: input.place,
    price: input.price,
    attendMember: [mockState.currentUser._id ?? 'user-1'],
    classId: {
      _id: classInfo._id,
      className: classInfo.className,
    },
  };

  classInfo.meetingDay = [...(classInfo.meetingDay ?? []), meeting];
  return meeting;
};

export const attendMeeting = (input: { classId?: string; _id?: string; userId?: string }) => {
  const classInfo = getClassById(input.classId);
  if (!classInfo || !input._id) {
    return null;
  }

  const meeting = classInfo.meetingDay?.find((item) => item._id === input._id) ?? null;
  if (meeting && input.userId && !meeting.attendMember.includes(input.userId)) {
    meeting.attendMember.push(input.userId);
  }

  return meeting;
};

export const deleteMeeting = (input: { classId?: string; _id?: string }) => {
  const classInfo = getClassById(input.classId);
  if (!classInfo || !input._id) {
    return;
  }

  classInfo.meetingDay = (classInfo.meetingDay ?? []).filter((meeting) => meeting._id !== input._id);
};

export const sendInvites = (input: { classId?: string; checkList?: string[] }) => {
  const classInfo = getClassById(input.classId);
  if (!classInfo) {
    return;
  }

  const createdTime = new Date().toISOString();
  const invites = input.checkList ?? [];
  invites.forEach((userId) => {
    const target = mockState.inviteMessages[userId] ?? [];
    target.unshift({
      _id: `invite-${mockState.nextInviteId++}`,
      createdTime,
      info: classInfo,
    });
    mockState.inviteMessages[userId] = target;
  });
};

export const seedSignupLocation = '서울 강남구 삼성동';
