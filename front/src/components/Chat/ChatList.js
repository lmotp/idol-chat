import format from 'date-fns/format';
import React, { memo } from 'react';
import styled from 'styled-components';
import { Line } from '../../css/FormStyle';
const ChatListContainer = styled.div`
  padding-top: 24px;
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
  padding: 0 16px;
`;

const ChatBox = styled.li`
  display: flex;
  justify-content: ${(props) => props.me && 'flex-end'};
  margin-bottom: 33px;
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
  padding: 10px 10px 10px 12px;
  width: 100%;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  white-space: pre-wrap;
`;

const ChatList = ({ _id, chatSections, scrollRef }) => {
  return (
    <ChatListContainer ref={scrollRef}>
      {chatSections
        ? Object.entries(chatSections).map(([date, chats]) => {
            return (
              <>
                <Line width="38%" margin="0 0 24px 0" key={date}>
                  {date}
                </Line>
                <ChatWrap>
                  {chats.map((v) => {
                    const me = v.userId._id === _id;
                    return (
                      <ChatBox me={me}>
                        <ChatImg src={v.userId.profileimg} me={me} />
                        <ChatText>
                          <ChatUser me={me}>
                            <ChatNickName me={me}>{me ? '나' : v.userId.nickname}</ChatNickName>
                            <ChatTime>
                              {format(new Date(v.createdAt), `${'aaa' !== 'pm' ? '오후' : '오전'} HH시 mm분`)}
                            </ChatTime>
                          </ChatUser>
                          <ChatMeesage>{v.message}</ChatMeesage>
                        </ChatText>
                      </ChatBox>
                    );
                  })}
                </ChatWrap>
              </>
            );
          })
        : null}
    </ChatListContainer>
  );
};

export default memo(ChatList);
