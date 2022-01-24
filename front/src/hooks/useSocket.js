import { io } from 'socket.io-client';
import { useCallback } from 'react';

const BACK_URL = 'http://localhost:5000';

const sockets = {};
const useSocket = (classId) => {
  const disconnect = useCallback(() => {
    if (classId) {
      sockets[classId].disconnect();
      delete sockets[classId];
    }
  }, [classId]);
  if (!classId) {
    return [undefined, disconnect];
  }
  if (!sockets[classId]) {
    console.log('연결');
    sockets[classId] = io(`${BACK_URL}/test`, {
      transports: ['websocket'],
    });
  }

  return [sockets[classId], disconnect];
};

export default useSocket;
