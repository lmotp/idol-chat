import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
`;

const Logo = styled.h1`
  color: black;
  font-size: 4rem;
  line-height: 0.9;

  &:nth-child(2) {
    // margin-left: -33px;
  }
  &:nth-child(3) {
    margin-bottom: 33px;
  }
`;

const UserButton = styled.button`
  margin-bottom: 12px;
  width: 110px;
  height: 30px;
  cursor: pointer;
  outline: none;
  background: transparent;
  border-radius: 10px;
  border: 1px solid black;
  color: black;

  &:hover {
    color: blue;
  }
  &:nth-of-type(2) {
    margin-bottom: 0;
  }
`;

const Main = () => {
  return (
    <MainContainer>
      <Logo>우리</Logo>
      <Logo>동네</Logo>
      <Logo>오타쿠</Logo>
      <Link to="/login">
        <UserButton>로그인</UserButton>
      </Link>
      <Link to="/signup">
        <UserButton>회원가입</UserButton>
      </Link>
    </MainContainer>
  );
};

export default Main;
