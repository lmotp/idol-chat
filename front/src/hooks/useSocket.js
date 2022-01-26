import { io } from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'http://localhost:5000';

const sockets = {};
const useSocket = (classId) => {
  const disconnect = useCallback(() => {
    if (classId) {
      sockets[classId].disconnect();
      delete sockets[classId];
    }
  }, [classId]);

  if (!sockets[classId]) {
    console.log('나 몇번 실행됭?');

    sockets[classId] = io(`${backUrl}`, {
      transports: ['websocket'],
      path: '/socket.io',
    });
  }

  return [sockets[classId], disconnect];
};

export default useSocket;
