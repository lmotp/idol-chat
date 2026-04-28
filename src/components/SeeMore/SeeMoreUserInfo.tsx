import React, { useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import styled from '@emotion/styled';
import { overlay } from 'overlay-kit';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal/Modal';
import ModifyModal from '@/components/Modal/ModifyModal';
import ProfileImg from '@/components/ProfileImg';
import useAppStore from '@/stores/useAppStore';

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
  margin: 4px 0 6px;
  font-size: 15px;
`;

const InfoMySelf = styled.p`
  line-height: 1.5;
  font-size: 14px;
  width: 60%;
  white-space: pre-wrap;
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
  const { gender, location, nickname, profileimg, myself, _id } = useAppStore((state) => state.user.result);
  const [loadingState, setLoadingState] = useState(false);

  const ModalOpen = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal open={isOpen} onClose={close} onExit={unmount} ariaLabel="프로필 수정">
        <ModifyModal setLoadingState={setLoadingState} onClose={close} id={_id} img={profileimg} />
      </Modal>
    ));
  };

  return (
    <>
      {!loadingState ? (
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
              <GrLocation size="16px" style={{ marginRight: '2px' }} />
              {location}
            </InfoLocation>
            <Hr />
            <InfoMySelf>{myself}</InfoMySelf>
          </InfoWrap>
        </SeeMoreUserInfoWrap>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SeeMoreUserInfo;
