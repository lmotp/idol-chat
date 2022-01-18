import React from 'react';
import styled from 'styled-components';
import BackBar from '../components/BackBar';
import ChatItem from '../components/Chat/ChatItem';
import ChatList from '../components/Chat/ChatList';
import MemberList from '../components/Chat/MemberList';

const ChatRoomContainer = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const ChatRoomWrap = styled.div`
  width: 100%;
  height: 93.2vh;
`;

const ChatRoom = () => {
  return (
    <ChatRoomContainer>
      <BackBar title="채팅방" />
      <MemberList />
      <ChatRoomWrap>
        <ChatList />
        <ChatItem />
      </ChatRoomWrap>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
