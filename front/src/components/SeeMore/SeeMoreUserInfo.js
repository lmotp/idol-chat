import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProfileImg from '../ProfileImg';

const SeeMoreUserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoWrap = styled.div`
  width: 70%;
`;
const InfoEmail = styled.div``;
const InfoNickName = styled.div``;
const InfoGender = styled.div``;
const InfoLocation = styled.div``;

const ModifyButton = styled.div`
  font-size: 14px;
  color: rgb(200, 200, 200);
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const SeeMoreUserInfo = () => {
  const { email, gender, location, nickname, profileimg } = useSelector((state) => state.userCheckReducers.result);

  return (
    <SeeMoreUserInfoWrap>
      <ProfileImg profileImgSrc={profileimg} />
      <InfoWrap>
        <InfoEmail>{email}</InfoEmail>
        <InfoNickName>{gender}</InfoNickName>
        <InfoGender>{location}</InfoGender>
        <InfoLocation>{nickname}</InfoLocation>
      </InfoWrap>
      <ModifyButton>수정</ModifyButton>
    </SeeMoreUserInfoWrap>
  );
};

export default SeeMoreUserInfo;
