import format from 'date-fns/format';
import React, { memo } from 'react';
import styled from '@emotion/styled';
import { Line } from '@/design-system/styles/FormStyle';
import type { ChatMessage } from '@/types/domain/chat';

type Props = {
  _id?: string;
  chatSections: Record<string, ChatMessage[]> | null;
  scrollRef: React.RefObject<HTMLDivElement>;
};

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

const ChatBox = styled.li<{ me?: boolean }>`
  display: flex;
  justify-content: ${({ me }) => (me ? 'flex-end' : 'flex-start')};
  margin-bottom: 33px;
`;

const ChatImg = styled.img<{ me?: boolean; src?: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: ${({ me }) => (me ? 0 : '12px')};
  margin-left: ${({ me }) => (me ? '12px' : 0)};
  border: 1px solid rgb(200, 200, 200);
  order: ${({ me }) => (me ? 3 : 0)};
`;
const ChatText = styled.div<{ me?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ me }) => (me ? 'flex-end' : 'flex-start')};
`;
const ChatUser = styled.div<{ me?: boolean }>`
  display: flex;
  margin-bottom: 4px;
  justify-content: ${({ me }) => (me ? 'flex-end' : 'flex-start')};
`;
const ChatNickName = styled.div<{ me?: boolean }>`
  margin-right: ${({ me }) => (me ? 0 : '12px')};
  margin-left: ${({ me }) => (me ? '12px' : 0)};
  font-weight: bold;
  order: ${({ me }) => (me ? 2 : 0)};
`;
const ChatTime = styled.div`
  font-size: 14px;
`;
const ChatMeesage = styled.p`
  padding: 10px 10px 10px 12px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  white-space: pre-wrap;
`;

const ChatList = ({ _id, chatSections, scrollRef }: Props) => {
  return (
    <ChatListContainer ref={scrollRef}>
      {chatSections
        ? Object.entries(chatSections).map(([date, chats]) => {
            return (
              <React.Fragment key={date}>
                <Line width="38%" margin="0 0 24px 0">
                  {date}
                </Line>
                <ChatWrap>
                  {chats.map((v) => {
                    const me = v.userId?._id === _id;
                    return (
                      <ChatBox key={v._id} me={me}>
                        <ChatImg src={v.userId?.profileimg} me={me} />
                        <ChatText me={me}>
                          <ChatUser me={me}>
                            <ChatNickName me={me}>{me ? '나' : v.userId?.nickname}</ChatNickName>
                            <ChatTime>
                              {`${new Date(v.createdAt ?? Date.now()).getHours() >= 12 ? '오후' : '오전'} ${format(
                                new Date(v.createdAt ?? Date.now()),
                                'HH시 mm분',
                              )}`}
                            </ChatTime>
                          </ChatUser>
                          <ChatMeesage>{v.message}</ChatMeesage>
                        </ChatText>
                      </ChatBox>
                    );
                  })}
                </ChatWrap>
              </React.Fragment>
            );
          })
        : null}
    </ChatListContainer>
  );
};

export default memo(ChatList);
