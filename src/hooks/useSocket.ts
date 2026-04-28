import { useCallback } from 'react';
import { supabase as supabaseMaybe, hasSupabaseConfig } from '@/app/supabaseClient';
import { useMockApi } from '@/config/mock';
import { getMockSocket } from '@/mocks/mockSocket';

type SocketLike = {
  on: (event: string, listener: (...args: unknown[]) => void) => SocketLike;
  off: (event?: string, listener?: (...args: unknown[]) => void) => SocketLike;
  emit: (event: string, ...args: unknown[]) => SocketLike;
  disconnect: () => void;
};

const sockets: Record<string, SocketLike> = {};

const DEFAULT_PROFILE_IMG = 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240';
const supabase = supabaseMaybe as NonNullable<typeof supabaseMaybe>;

const createSupabaseSocket = (classId: string): SocketLike => {
  const listeners = new Map<string, Set<(...args: unknown[]) => void>>();
  let channel = null as ReturnType<typeof supabase.channel> | null;
  let connected = false;
  const seenMessageIds = new Set<string>();

  const callListeners = (event: string, ...args: unknown[]) => {
    const registered = listeners.get(event);
    if (!registered) {
      return;
    }

    for (const listener of registered) {
      listener(...args);
    }
  };

  const fetchUserSummary = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('id,nickname,profileimg')
      .eq('id', userId)
      .maybeSingle();

    return data;
  };

  const emitMessage = async (message: string, userId: string, createdAt?: string) => {
    const profile = await fetchUserSummary(userId);
    const payload = [
      {
        _id: `${createdAt ?? Date.now()}`,
        classId,
        message,
        createdAt: createdAt ?? new Date().toISOString(),
        userId: {
          _id: userId,
          nickname: profile?.nickname ?? '',
          profileimg: profile?.profileimg ?? DEFAULT_PROFILE_IMG,
        },
      },
    ];

    callListeners('message', payload);
  };

  const ensureChannel = () => {
    if (channel || !hasSupabaseConfig) {
      return;
    }

    channel = supabase.channel(`chat:${classId}`);
    channel.on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `class_id=eq.${classId}`,
      },
      async (payload) => {
        const row = payload.new as {
          id?: string;
          class_id?: string;
          user_id?: string;
          message?: string;
          created_at?: string;
        };

        if (!row.id || seenMessageIds.has(row.id)) {
          return;
        }

        seenMessageIds.add(row.id);

        await emitMessage(row.message ?? '', row.user_id ?? '', row.created_at);
      },
    );

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        connected = true;
        callListeners('join', [{ classId }]);
      }
    });
  };

  const disconnect = () => {
    if (channel) {
      void supabase.removeChannel(channel);
    }

    channel = null;
    connected = false;
    listeners.clear();
  };

  return {
    on: (event, listener) => {
      const current = listeners.get(event) ?? new Set();
      current.add(listener);
      listeners.set(event, current);

      if (event === 'joinRoom') {
        ensureChannel();
      }

      if (event === 'leaveRoom') {
        ensureChannel();
      }

      return sockets[classId];
    },
    off: (event, listener) => {
      if (!event) {
        listeners.clear();
        return sockets[classId];
      }

      if (!listeners.has(event)) {
        return sockets[classId];
      }

      if (!listener) {
        listeners.delete(event);
        return sockets[classId];
      }

      listeners.get(event)?.delete(listener);
      return sockets[classId];
    },
    emit: (event, ...args) => {
      if (event === 'joinRoom') {
        ensureChannel();
        callListeners('join', [{ classId }]);
        return sockets[classId];
      }

      if (event === 'leaveRoom') {
        callListeners('leave', [{ classId }]);
        disconnect();
        return sockets[classId];
      }

      if (event === 'message') {
        const payload = args[0] as { userId?: string; classId?: string; message?: string } | undefined;
        if (!payload?.userId || !payload.message) {
          return sockets[classId];
        }

        const sendMessage = async () => {
          const { data, error } = await supabase
            .from('chat_messages')
            .insert({
              class_id: payload.classId ?? classId,
              user_id: payload.userId,
              message: payload.message,
            })
            .select('id,class_id,user_id,message,created_at')
            .single();

          if (error || !data) {
            return;
          }

          if (data.id) {
            seenMessageIds.add(data.id);
          }

          await emitMessage(data.message, data.user_id, data.created_at);
        };

        void sendMessage();
        return sockets[classId];
      }

      callListeners(event, ...args);
      return sockets[classId];
    },
    disconnect,
  };
};

const useSocket = (classId?: string) => {
  const disconnect = useCallback(() => {
    if (classId && sockets[classId]) {
      sockets[classId].disconnect();
      delete sockets[classId];
    }
  }, [classId]);

  if (classId && !sockets[classId]) {
    if (useMockApi) {
      sockets[classId] = getMockSocket(classId) ?? {
        on: () => sockets[classId],
        off: () => sockets[classId],
        emit: () => sockets[classId],
        disconnect: () => undefined,
      };
    } else if (hasSupabaseConfig) {
      sockets[classId] = createSupabaseSocket(classId);
    } else {
      sockets[classId] = {
        on: () => sockets[classId],
        off: () => sockets[classId],
        emit: () => sockets[classId],
        disconnect: () => undefined,
      };
    }
  }

  return [classId ? sockets[classId] : null, disconnect] as const;
};

export default useSocket;
