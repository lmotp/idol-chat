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
  const testMember = [
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트1호', me: true },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트4호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
    { img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240', nickName: '테스트2호', me: false },
  ];
  return (
    <ChatRoomContainer>
      <BackBar title="채팅방" />
      <MemberList />
      <ChatRoomWrap>
        <ChatList testMember={testMember} />
        <ChatItem />
      </ChatRoomWrap>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
