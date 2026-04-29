import { HttpResponse, http } from 'msw';
import {
  addMeeting,
  authenticate,
  createUserFromSignup,
  deleteMeeting,
  getActiveUser,
  getChatMessages,
  getClassById,
  getClassesForList,
  getInviteMessages,
  getInviteTargets,
  getMembersByClassId,
  getMyClasses,
  getUnreadCount,
  joinClass,
  leaveClass,
  logout,
  makeClass,
  mockState,
  sendInvites,
  seedSignupLocation,
  setActiveUser,
  updateClassInfo,
  updateCurrentUser,
  updateUserCategories,
} from './data';

const json = (data: any, init?: ResponseInit) => HttpResponse.json(data, init);

export const handlers = [
  http.get('/api/auth/auth-check', () => {
    const user = getActiveUser();
    return json(user ?? { loginSuccess: false });
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };
    const user = authenticate(body.email ?? '', body.password ?? '');

    if (!user) {
      return json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    return json(user);
  }),

  http.post('/api/auth/signup', async ({ request }) => {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      nickname?: string;
      gender?: string;
      location?: string;
    };

    const result = createUserFromSignup({
      email: body.email ?? '',
      password: body.password ?? '',
      nickname: body.nickname ?? '',
      gender: body.gender ?? 'nothing',
      location: body.location ?? seedSignupLocation,
    });

    return json(result);
  }),

  http.get('/api/auth/logout', () => {
    logout();
    return json({ success: true });
  }),

  http.post('/api/auth/modify', async ({ request }) => {
    const body = await request.formData();
    const image = body.get('image');

    updateCurrentUser({
      nickname: String(body.get('nickname') ?? ''),
      myself: String(body.get('myself') ?? ''),
      gender: String(body.get('gender') ?? ''),
      profileImg: typeof image === 'string' ? image : mockState.currentUser.profileImg,
      profileimg: typeof image === 'string' ? image : mockState.currentUser.profileimg,
    });

    return json({ success: true });
  }),

  http.post('/api/auth/select-category', async ({ request }) => {
    const body = (await request.json()) as { clickCategory?: string[] };
    updateUserCategories(body.clickCategory ?? []);
    return json({ success: true });
  }),

  http.post('/api/auth/category/modify', async ({ request }) => {
    const body = (await request.json()) as { selectCategry?: string[]; userId?: string };
    updateUserCategories(body.selectCategry ?? []);
    return json({ success: true });
  }),

  http.post('/api/class/list', async ({ request }) => {
    const body = (await request.json()) as {
      selectCategory?: string;
      useSearchCategory?: string;
      pages?: number;
    };

    return json(getClassesForList(body));
  }),

  http.get('/api/class/list/my/:userId', ({ params }) => {
    return json(getMyClasses(params.userId as string));
  }),

  http.get('/api/class/info/member/:id', ({ params }) => {
    return json(getMembersByClassId(params.id as string));
  }),

  http.get('/api/class/info/:id', ({ params }) => {
    const classInfo = getClassById(params.id as string);
    return json(classInfo ? [classInfo] : []);
  }),

  http.get('/api/class/invite/member/:category/:location/:classId', ({ params }) => {
    return json(getInviteTargets(params.category as string, params.location as string, params.classId as string));
  }),

  http.post('/api/class/invite/send', async ({ request }) => {
    const body = (await request.json()) as { checkList?: string[]; classId?: string };
    sendInvites(body);
    return json({ success: true });
  }),

  http.get('/api/class/:userId/invite/message', ({ params }) => {
    return json({ inviteMessage: getInviteMessages(params.userId as string) });
  }),

  http.post('/api/class/make', async ({ request }) => {
    const body = (await request.json()) as {
      location?: string;
      category?: string;
      className?: string;
      classTarget?: string;
      memberCount?: number;
      makeUser?: string;
      hashTag?: string[];
    };

    const classId = makeClass({
      location: body.location ?? '서울 강남구 삼성동',
      category: body.category ?? '여자아이돌',
      className: body.className ?? '새 모임',
      classTarget: body.classTarget ?? '',
      memberCount: body.memberCount ?? 20,
      makeUser: body.makeUser,
      hashTag: body.hashTag ?? [],
    });

    return json(classId);
  }),

  http.post('/api/class/info/join/member', async ({ request }) => {
    const body = (await request.json()) as { userId?: string; classId?: string };
    joinClass(body.userId, body.classId);
    return json({ success: true });
  }),

  http.post('/api/class/info/secession/member', async ({ request }) => {
    const body = (await request.json()) as { userId?: string; classId?: string };
    leaveClass(body.userId, body.classId);
    return json({ success: true });
  }),

  http.post('/api/class/info/admin/modify', async ({ request }) => {
    const contentType = request.headers.get('content-type') ?? '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      updateClassInfo({
        id: String(formData.get('id') ?? ''),
        image: (formData.get('image') as string | File | null) ?? undefined,
      });
      return json({ success: true });
    }

    const body = (await request.json()) as { id?: string; className?: string; classTarget?: string };
    updateClassInfo(body);
    return json({ success: true });
  }),

  http.get('/api/meeting/list/:classId', ({ params }) => {
    const classInfo = getClassById(params.classId as string);
    return json(classInfo?.meetingDay ?? []);
  }),

  http.post('/api/meeting/make', async ({ request }) => {
    const body = (await request.json()) as {
      name?: string;
      place?: string;
      price?: string;
      memberCount?: number;
      day?: Date | string | null;
      time?: string;
      classId?: string;
    };

    const meeting = addMeeting({
      name: body.name ?? '',
      place: body.place ?? '',
      price: body.price ?? '',
      memberCount: body.memberCount ?? 20,
      day: body.day ? new Date(body.day) : null,
      time: body.time ?? '12:00',
      classId: body.classId,
    });

    return json(meeting ? { success: true } : { success: false }, meeting ? undefined : { status: 404 });
  }),

  http.post('/api/meeting/attend', async ({ request }) => {
    const body = (await request.json()) as { userId?: string; classId?: string; _id?: string };
    const meeting = mockState.classes.find((item) => item._id === body.classId)?.meetingDay?.find((item) => item._id === body._id);

    if (meeting && body.userId && !meeting.attendMember.includes(body.userId)) {
      meeting.attendMember.push(body.userId);
    }

    return json({ success: true });
  }),

  http.post('/api/meeting/delete', async ({ request }) => {
    const body = (await request.json()) as { classId?: string; _id?: string };
    deleteMeeting(body);
    return json({ success: true });
  }),

  http.get('/api/chat/message/:classId/:pages', ({ params }) => {
    const page = Number(params.pages ?? 0);
    return json(getChatMessages(params.classId as string, page));
  }),

  http.get('/api/chat/:classId/unreads/:date', ({ params }) => {
    return json({ count: getUnreadCount(params.classId as string, params.date as string) });
  }),

];
