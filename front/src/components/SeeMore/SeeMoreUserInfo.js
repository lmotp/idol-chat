import React, { useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import ModifyModal from '../Modal/ModifyModal';
import ProfileImg from '../ProfileImg';

const SeeMoreUserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const InfoWrap = styled.div`
  width: 78%;
`;

const InfoFirstWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoFirst = styled.div``;

const InfoNickName = styled.div`
  font-size: 21px;
  font-weight: bold;
  display: inline-block;
  margin-right: 8px;
`;
const InfoGender = styled.div`
  display: inline-block;
`;
const InfoLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 128px;
  margin: 4px 0 6px;
  font-size: 15px;
`;

const InfoMySelf = styled.p`
  line-height: 1.5;
  font-size: 14px;
  width: 60%;
`;

const ModifyButton = styled.span`
  font-size: 14px;
  color: rgb(200, 200, 200);
  cursor: pointer;

  text-align: right;
  &:hover {
    color: black;
  }
`;

const Hr = styled.hr`
  margin: 8px 0;
`;

const SeeMoreUserInfo = () => {
  const { gender, location, nickname, profileimg, myself } = useSelector((state) => state.userCheckReducers.result);
  const [modalState, setModalState] = useState(false);

  // 모달창 함수
  const ModalOpen = () => {
    setModalState(true);
  };

  const ModalClose = () => {
    setModalState(false);
  };

  return (
    <SeeMoreUserInfoWrap>
      <ProfileImg profileimg={profileimg} />
      <InfoWrap>
        <InfoFirstWrap>
          <InfoFirst>
            <InfoNickName>{nickname}</InfoNickName>
            <InfoGender>{gender !== 'nothing' ? (gender === 'men' ? '남자' : '여성') : '성별미선택'}</InfoGender>
          </InfoFirst>
          <ModifyButton onClick={ModalOpen}>수정</ModifyButton>
        </InfoFirstWrap>
        <InfoLocation>
          <GrLocation size="16px" />
          {location}
        </InfoLocation>
        <Hr />
        <InfoMySelf>{myself}</InfoMySelf>
      </InfoWrap>
      <Modal modalState={modalState}>
        <ModifyModal ModalClose={ModalClose} ModalOpen={ModalOpen} />
      </Modal>
    </SeeMoreUserInfoWrap>
  );
};

export default SeeMoreUserInfo;
