import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  outline: none;
  border: none;
  border-bottom: 1px solid;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 32px;

  ::placeholder {
    color: black;
    font-weight: bold;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: rgb(181, 181, 181);
`;

const Point = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 4px;
`;

const SignUpButton = styled.button`
  display: block;
  font-size: 16px;
  width: 100%;
  height: 40px;
  color: white;
  background: #db7093;
  border-radius: 5px;
`;

export const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const nicknameRef = useRef(null);

  const signUp = (e) => {
    e.preventDefault();

    const info = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
      nickname: nicknameRef.current.value,
    };

    axios.post('/signup', info).then(() => {
      info.email = '';
      info.password = '';
      info.passwordConfirm = '';
      info.nickname = '';
    });
  };

  useEffect(() => {
    axios.get('/test').then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Form onSubmit={signUp}>
      <Label htmlFor="email">이메일</Label>
      <Point>*</Point>
      <Input type="email" id="email" placeholder="이메일을 입력해주세요." ref={emailRef}></Input>

      <Label htmlFor="password">비밀번호</Label>
      <Point>*</Point>
      <Input
        autoComplete="off"
        type="password"
        id="password"
        placeholder="비밀번호를 입력해주세요."
        ref={passwordRef}
      ></Input>

      <Label htmlFor="password-confirm">비밀번호 확인</Label>
      <Point>*</Point>
      <Input
        autoComplete="off"
        type="password"
        id="password-confirm"
        placeholder="비밀번호를 한번 더 입력해주세요."
        ref={passwordConfirmRef}
      ></Input>

      <Label htmlFor="nickname">닉네임</Label>
      <Point>*</Point>
      <Input type="text" id="nickname" placeholder="닉네임을 입력해주세요." ref={nicknameRef}></Input>

      <SignUpButton>가입하기</SignUpButton>
    </Form>
  );
};
