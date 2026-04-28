import { format } from 'date-fns';
import { mockState } from './data';

type Listener = (...args: any[]) => void;

export interface MockSocketLike {
  on: (event: string, listener: Listener) => MockSocketLike;
  off: (event?: string, listener?: Listener) => MockSocketLike;
  emit: (event: string, ...args: any[]) => MockSocketLike;
  disconnect: () => void;
}

class MockSocket implements MockSocketLike {
  private listeners = new Map<string, Set<Listener>>();
  private roomId: string;

  constructor(roomId: string) {
    this.roomId = roomId;
  }

  on(event: string, listener: Listener) {
    const entries = this.listeners.get(event) ?? new Set<Listener>();
    entries.add(listener);
    this.listeners.set(event, entries);
    return this;
  }

  off(event?: string, listener?: Listener) {
    if (!event) {
      this.listeners.clear();
      return this;
    }

    if (!listener) {
      this.listeners.delete(event);
      return this;
    }

    this.listeners.get(event)?.delete(listener);
    return this;
  }

  emit(event: string, ...args: any[]) {
    if (event === 'message') {
      const payload = args[0] as { userId?: string; classId?: string; message?: string };
      const message = {
        _id: `chat-${mockState.nextChatId++}`,
        createdAt: new Date().toISOString(),
        message: payload.message ?? '',
        text: payload.message ?? '',
        userId: {
          _id: payload.userId,
          nickname: mockState.currentUser.nickname,
          profileimg: mockState.currentUser.profileimg,
        },
      };

      const roomMessages = mockState.chats[this.roomId] ?? [];
      roomMessages.push(message);
      mockState.chats[this.roomId] = roomMessages;
      this.listeners.get('message')?.forEach((listener) => listener([message]));
    }

    if (event === 'joinRoom') {
      this.listeners.get('join')?.forEach((listener) => listener({ roomId: args[0], joinedAt: format(new Date(), 'HH:mm:ss') }));
    }

    if (event === 'leaveRoom') {
      this.listeners.get('leave')?.forEach((listener) => listener({ roomId: args[0], leftAt: format(new Date(), 'HH:mm:ss') }));
    }

    return this;
  }

  disconnect() {
    this.listeners.clear();
  }
}

const sockets = new Map<string, MockSocket>();

export const getMockSocket = (roomId?: string) => {
  if (!roomId) {
    return null;
  }

  if (!sockets.has(roomId)) {
    sockets.set(roomId, new MockSocket(roomId));
  }

  return sockets.get(roomId) ?? null;
};
