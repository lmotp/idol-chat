import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userCheckActions } from '../modules/actions/UserActions';
import { useNavigate } from 'react-router-dom';
import SeeMoreUserInfo from '../components/SeeMore/SeeMoreUserInfo';
import SelectCategory from '../components/SelectCategory';

const SeeMoreContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SeeMoreButton = styled.button`
  width: 100px;
  margin-bottom: 20px;
`;

const SeeMore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutClick = () => {
    axios.get('/api/auth/logout').then(() => {
      dispatch(userCheckActions());
      navigate('/');
    });
  };

  return (
    <SeeMoreContainer>
      <SeeMoreUserInfo />
      <SelectCategory />
      <SeeMoreButton onClick={logoutClick}>로그아웃</SeeMoreButton>
    </SeeMoreContainer>
  );
};

export default SeeMore;
