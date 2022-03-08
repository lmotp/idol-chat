import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userCheckActions } from '../modules/actions/UserActions';
import { useNavigate } from 'react-router-dom';
import SeeMoreUserInfo from '../components/SeeMore/SeeMoreUserInfo';
import SelectCategory from '../components/SelectCategory';
import { AuthButton, Line } from '../css/FormStyle';
import InviteMessageBox from '../components/SeeMore/InviteMessageBox';

const SeeMoreContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0 90px;
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
      <Line margin="0 0 20px 0" width="40%">
        초대받은 모임
      </Line>
      <InviteMessageBox />
      <AuthButton color="black" margin="0" onClick={logoutClick}>
        로그아웃
      </AuthButton>
    </SeeMoreContainer>
  );
};

export default SeeMore;
