import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackBar from '../components/BackBar';
import { AuthButton, AuthButtonWrap, Form, Input, InputWrap, Label } from '../css/FormStyle';
import { userCheckActions } from '../modules/actions/UserActions';

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

const LoginContainer = styled.section`
  width: 100%;
  height: 100vh;
`;

const ErrorContent = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  height: 20px;
  visibility: ${(props) => (props.error ? 'visible' : 'hidden')};
`;

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const loginFunc = (e) => {
    e.preventDefault();

    const info = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!info.email.length) {
      return setErrorMessage('이메일을 입력해주세요');
    }

    if (!info.password.length) {
      return setErrorMessage('비밀번호를 입력해주세요');
    }

    axios
      .post('/api/auth/login', info, { withCredentials: true })
      .then(({ data }) => {
        if (data.loginSuccess) {
          dispatch(userCheckActions());
          if (!data.firstCategory) {
            navigate('/category');
          } else {
            navigate('/pages/home');
          }
        }
      })
      .catch(({ response: { data } }) => {
        setErrorMessage(data.message);
      });
  };

  return (
    <LoginContainer>
      <BackBar title="로그인" />
      <Form onSubmit={loginFunc}>
        <InputWrap>
          <Label htmlFor="email">이메일</Label>
          <Input type="text" id="email" placeholder="이메일을 입력해주세요." ref={emailRef}></Input>
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
        </InputWrap>

        <ErrorContent error={errorMessage}>{`* ${errorMessage}`}</ErrorContent>

        <AuthButtonWrap mt={'0'}>
          <AuthButton color="black">로그인하기</AuthButton>

          <GotoSingUp>
            아직 회원이 아니신가요?
            <Link to="/signup">
              <SignUpValue>회원가입</SignUpValue>
            </Link>
          </GotoSingUp>
        </AuthButtonWrap>
      </Form>
    </LoginContainer>
  );
};

export default Login;
