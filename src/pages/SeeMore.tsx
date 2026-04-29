import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/app/apiClient';
import SeeMoreUserInfo from '@/components/SeeMore/SeeMoreUserInfo';
import SelectCategory from '@/components/SelectCategory';
import { AuthButton, Line } from '@/design-system/styles/FormStyle';
import InviteMessageBox from '@/components/SeeMore/InviteMessageBox';
import useAppStore from '@/stores/useAppStore';

const SeeMoreContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0 90px;
`;

const SeeMore = () => {
  const navigate = useNavigate();
  const clearUser = useAppStore((state) => state.clearUser);

  const logoutClick = () => {
    apiClient.get('/api/auth/logout').then(() => {
      clearUser();
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
