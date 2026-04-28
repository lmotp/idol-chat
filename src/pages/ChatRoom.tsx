import React from 'react';
import styled from '@emotion/styled';
import BackBar from '@/components/BackBar';
import ChatItem from '@/components/Chat/ChatItem';
import MemberList from '@/components/Chat/MemberList';
import useAppStore from '@/stores/useAppStore';

const ChatRoomContainer = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const ChatRoom = () => {
  const _id = useAppStore((state) => state.user.result._id);

  return (
    <ChatRoomContainer>
      <BackBar title="채팅방" />
      <MemberList _id={_id} />
      <ChatItem _id={_id} />
    </ChatRoomContainer>
  );
};

export default ChatRoom;
