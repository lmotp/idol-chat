import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BackBar from '../components/BackBar';
import ChatItem from '../components/Chat/ChatItem';
import MemberList from '../components/Chat/MemberList';

const ChatRoomContainer = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const ChatRoom = () => {
  const { _id } = useSelector((state) => state.userCheckReducers.result);

  return (
    <ChatRoomContainer>
      <BackBar title="채팅방" />
      <MemberList _id={_id} />
      <ChatItem _id={_id} />
    </ChatRoomContainer>
  );
};

export default ChatRoom;
