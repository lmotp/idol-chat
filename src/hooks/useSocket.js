import { io } from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'https://townotaku.herokuapp.com/';
// const prevbackUrl = 'http://localhost:5000/';

const sockets = {};
const useSocket = (classId) => {
  const disconnect = useCallback(() => {
    if (classId) {
      sockets[classId].disconnect();
      delete sockets[classId];
    }
  }, [classId]);

  if (!sockets[classId]) {
    sockets[classId] = io(`${backUrl}`, {
      transports: ['websocket'],
      path: '/socket.io',
    });
  }

  return [sockets[classId], disconnect];
};

export default useSocket;
