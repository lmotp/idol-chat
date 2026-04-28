import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useSocket from '@/hooks/useSocket';
import { FaPaperPlane } from 'react-icons/fa';
import ChatList from '@/components/Chat/ChatList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import type { ChatMessage, ChatSection } from '@/types/domain/chat';

const ChatRoomWrap = styled.div`
  width: 100%;
  height: 93.2vh;
`;

const FormBox = styled.form`
  width: 100%;
  height: 120px;
  border: 1px solid rgb(200, 200, 200);
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
`;

const TextBox = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  outline: none;
  border: none;
  padding: 14px 21px;
  font-size: 14px;
`;
const ButtonBox = styled.button`
  width: 100%;
  height: 80%;
  background: white;
  padding-right: 14px;
  border-top: 1px solid rgb(200, 200, 200);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ChatItem = ({ _id }: { _id?: string }) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [pages, setPages] = useState(0);
  const [hasData, setHasData] = useState(false);
  const [chatSections, setChatSections] = useState<Record<string, ChatMessage[]> | null>(null);
  const { id } = useParams();
  const [socket] = useSocket(id);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket || !id) {
      return;
    }
    socket.emit('joinRoom', id);
    socket.on('join', (data) => {});
  }, [id, socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('message', (...args: unknown[]) => {
      const data = args[0] as ChatMessage[];
      const chatReverse = [...chat].reverse();
      setChat([data[0], ...chatReverse]);
      setTimeout(() => {
        if (scrollRef.current && data[0].userId?._id === _id) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 50);
    });

    return () => {
      socket.off();
    };
  }, [chat, socket, _id]);

  useEffect(() => {
    axios.get(`/api/chat/message/${id}/${pages}`).then(({ data }) => {
      if (data.length > 0) {
        setChat((prevItems) => {
          return [...data, ...prevItems].reverse();
        });
      }
      setHasData(data.length >= 10);
      if (scrollRef.current && !pages) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, [id, pages]);

  useEffect(() => {
    const sections: Record<string, ChatMessage[]> = {};
    if (chat.length) {
      [...chat].reverse().forEach((chatItem) => {
        const monthDate = format(new Date(chatItem.createdAt ?? Date.now()), 'yyyy년 MM월 dd일');
        if (Array.isArray(sections[monthDate])) {
          sections[monthDate].push(chatItem);
        } else {
          sections[monthDate] = [chatItem];
        }
      });

      setChatSections(sections);
    }
  }, [chat]);

  const handleScroll = () => {
    const scrollTop = scrollRef.current?.scrollTop ?? 0;

    if (!hasData) {
      return;
    }

    if (scrollTop === 0 && hasData) {
      setPages(pages + 1);
    }
  };

  useEffect(() => {
    const scrollClassList = scrollRef.current;
    if (!scrollClassList) {
      return;
    }
    scrollClassList.addEventListener('scroll', handleScroll);
    return () => {
      scrollClassList.removeEventListener('scroll', handleScroll);
    };
  });

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!socket || !id || !textRef.current?.value) {
      return;
    }

    socket.emit('message', { userId: _id, classId: id, message: textRef.current.value });
    textRef.current.focus();
    textRef.current.value = '';
  };

  const onKeydownChat = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onMessageSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <ChatRoomWrap>
      <ChatList chatSections={chatSections} _id={_id} scrollRef={scrollRef} />
      <FormBox onSubmit={onMessageSubmit}>
        <TextBox ref={textRef} onKeyDown={onKeydownChat}></TextBox>
        <ButtonBox>
          <FaPaperPlane size="18px" color="rgb(200,200,200)" />
        </ButtonBox>
      </FormBox>
    </ChatRoomWrap>
  );
};

export default ChatItem;
