import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useSocket from '../../hooks/useSocket';
import { FaPaperPlane } from 'react-icons/fa';
import ChatList from './ChatList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useElementScroll } from 'framer-motion';

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

const ChatItem = ({ _id }) => {
  const [chat, setChat] = useState([]);
  const [pages, setPages] = useState(0);
  const [hasData, setHasData] = useState(true);
  const { id } = useParams();
  const [socket] = useSocket(id);
  const textRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.emit('joinRoom', id);
    socket.on('join', (data) => {
      console.log(data);
    });
  }, [id, socket]);

  useEffect(() => {
    socket.on('message', (data) => {
      const chatPushData = chat.concat(data[0]);
      setChat(chatPushData);
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
    return () => {
      socket.off();
    };
  }, [chat, socket]);

  useEffect(() => {
    axios.get(`/api/chat/message/${id}/${pages}`).then(({ data }) => {
      if (data.length > 0) {
        console.log('나 몇번 실행되는거니?');
        setChat((prevItems) => {
          return [...data, ...prevItems];
        });
      }
      setHasData(data.length > 0);
      if (scrollRef.current && !pages) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, [id, pages]);

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;

    if (!hasData) {
      console.log('???');
      return;
    }

    if (scrollTop === 0 && hasData) {
      setPages(pages + 1);
    }
  };

  useEffect(() => {
    const scrollClassList = scrollRef.current;
    scrollClassList.addEventListener('scroll', handleScroll);
    return () => {
      scrollClassList.removeEventListener('scroll', handleScroll);
    };
  });

  console.log(chat.map((v) => v.message));

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (textRef.current.value) {
      socket.emit('message', { userId: _id, classId: id, message: textRef.current.value });
      textRef.current.focus();
      textRef.current.value = '';
    }
  };

  const onKeydownChat = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        onMessageSubmit(e);
      }
    }
  };

  return (
    <ChatRoomWrap>
      <ChatList chat={chat} _id={_id} scrollRef={scrollRef} />
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
