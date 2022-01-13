import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';

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

const ChatItem = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const socket = io('/test');
  const textRef = useRef();

  useEffect(() => {
    socket.on('test', (data) => {
      console.log(data);
    });
  }, [socket]);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit('test', message);
    textRef.current.focus();
    setMessage('');
  };

  return (
    <FormBox onSubmit={onMessageSubmit}>
      <TextBox ref={textRef} value={message} onChange={(e) => setMessage(e.target.value)}></TextBox>
      <ButtonBox>
        <FaPaperPlane size="18px" color="rgb(200,200,200)" />
      </ButtonBox>
    </FormBox>
  );
};

export default ChatItem;
