import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userCheckActions } from '../modules/actions/UserActions';
import { useNavigate } from 'react-router-dom';

const SeeMoreButton = styled.button`
  width: 100px;
`;

const SeeMore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, gender, location, nickname } = useSelector((state) => state.userCheckReducers.result);

  console.log(email, gender, location, nickname);

  const logoutClick = () => {
    axios.get('/api/auth/logout').then(() => {
      dispatch(userCheckActions());
      navigate('/');
    });
  };

  return <SeeMoreButton onClick={logoutClick}>로그아웃</SeeMoreButton>;
};

export default SeeMore;
