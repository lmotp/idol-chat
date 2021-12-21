import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackBar from '../components/BackBar';
import { AuthButton, AuthButtonWrap, ErrorValue, Form, Input, InputWrap, Label } from '../css/FormStyle';
import { ReactComponent as Twitter } from '../images/twitter-brands.svg';

const Line = styled.div`
  text-align: center;
  position: relative;
  color: rgb(111, 111, 111);

  &:before {
    width: 45%;
    height: 1px;
    background: rgb(181, 181, 181);
    content: '';
    display: block;
    position: absolute;
    top: 50%;
  }
  &:after {
    width: 45%;
    height: 1px;
    background: rgb(181, 181, 181);
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
  }
`;

const GotoSingUp = styled.div`
  font-size: 12px;
  color: rgb(181, 181, 181);
`;

const SignUpValue = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  color: rgb(111, 111, 111);
`;

const Login = (props) => {
  console.log(props);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCode, setErrorCode] = useState();

  const errorFunc = (code, message) => {
    setErrorMessage(message);
    setErrorCode(code);
  };

  const loginFunc = (e) => {
    e.preventDefault();

    const info = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!info.email.length) {
      return errorFunc(0, '이메일을 입력해주세요');
    }

    if (!info.password.length) {
      return errorFunc(1, '비밀번호를 입력해주세요');
    }

    axios.post('/api/auth/login', info, { withCredentials: true }).then(({ data }) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      if (data.loginSuccess) {
        navigate('/');
      }
    });
  };

  return (
    <>
      <BackBar title="로그인" />
      <Form onSubmit={loginFunc}>
        <InputWrap>
          <Label htmlFor="email">이메일</Label>
          <Input type="text" id="email" placeholder="이메일을 입력해주세요." ref={emailRef}></Input>
          {errorCode === 0 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <InputWrap>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            autoComplete="off"
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            ref={passwordRef}
          ></Input>
          {errorCode === 1 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <AuthButtonWrap>
          <AuthButton color="black">로그인하기</AuthButton>
          <Line>또는</Line>
          <AuthButton color="#00acee ">
            <Twitter width="20px" height="20px" fill="white" /> &nbsp; 트위터 로그인하기
          </AuthButton>

          <GotoSingUp>
            아직 회원이 아니신가요?
            <Link to="/signup">
              <SignUpValue>회원가입</SignUpValue>
            </Link>
          </GotoSingUp>
        </AuthButtonWrap>
      </Form>
    </>
  );
};

export default Login;
