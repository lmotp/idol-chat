import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import ChatList from './ChatList';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
const socket = io('http://localhost:5000/test', { transports: ['websocket'] });

const ChatItem = ({ _id }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const { id } = useParams();
  const textRef = useRef();
  const scrollRef = useRef();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    console.log(socket);
    socket.on('Message', (data) => {
      setChat([...chat, data[0]]);
      scrollToBottom();
    });
  }, [chat]);

  useEffect(() => {
    axios.get(`/api/chat/message/${id}`).then(({ data }) => {
      setChat(data);
    });
  }, [id]);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('Message', { userId: _id, classId: id, message: message });
      textRef.current.focus();
      setMessage('');
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
        <TextBox
          ref={textRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeydownChat}
        ></TextBox>
        <ButtonBox>
          <FaPaperPlane size="18px" color="rgb(200,200,200)" />
        </ButtonBox>
      </FormBox>
    </ChatRoomWrap>
  );
};

export default ChatItem;
