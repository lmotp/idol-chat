import format from 'date-fns/format';
import React, { memo } from 'react';
import styled from 'styled-components';
const ChatListContainer = styled.div`
  padding-top: 33px;
  padding-left: 21px;
  width: 100%;
  height: 86%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const ChatWrap = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChatBox = styled.li`
  display: flex;
  justify-content: ${(props) => props.me && 'flex-end'};
  margin-bottom: 33px;
  padding-right: 21px;
`;

const ChatImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: ${(props) => (props.me ? 0 : '12px')};
  margin-left: ${(props) => props.me && '12px'};
  border: 1px solid rgb(200, 200, 200);
  order: ${(props) => props.me && 3};
`;
const ChatText = styled.div``;
const ChatUser = styled.div`
  display: flex;
  margin-bottom: 4px;
  justify-content: ${(props) => props.me && 'flex-end'};
`;
const ChatNickName = styled.div`
  margin-right: ${(props) => (props.me ? 0 : '12px')};
  margin-left: ${(props) => props.me && '12px'};
  font-weight: bold;
  order: ${(props) => props.me && 2};
`;
const ChatTime = styled.div`
  font-size: 14px;
`;
const ChatMeesage = styled.p`
  padding: 10px;
  width: 100%;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  white-space: pre-wrap;
`;

const ChatList = ({ chat, _id }) => {
  const chatTest = [
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: false,
      message: '안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: false,
      message:
        '안녕하세요 저는 정글의법칙에서 온 김병만입니다.안녕하세요 저는 정글의법칙에서 온 김병만입니다.안녕하세요 저는 정글의법칙에서 온 김병만입니다.안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: false,
      message: '안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: false,
      message: '안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: true,
      message: '안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: false,
      message: '안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: false,
      message: '안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: false,
      message: '안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: false,
      message: '안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
    {
      img: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트2호',
      me: false,
      message: '안녕하세요 저는 정글의법칙에서 온 김병만입니다.',
      time: format(new Date(), 'hh시mm분'),
    },
  ];
  return (
    <ChatListContainer>
      <ChatWrap>
        {chatTest.map((v, i) => {
          return (
            <ChatBox me={v.me}>
              <ChatImg src={v.img} me={v.me} />
              <ChatText>
                <ChatUser me={v.me}>
                  <ChatNickName me={v.me}>{v.me ? '나' : v.nickName}</ChatNickName>
                  <ChatTime>{v.time}</ChatTime>
                </ChatUser>
                <ChatMeesage>{v.message}</ChatMeesage>
              </ChatText>
            </ChatBox>
          );
        })}
      </ChatWrap>
    </ChatListContainer>
  );
};

export default memo(ChatList);
