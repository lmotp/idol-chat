import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import MeetingMakeModal from '../Modal/MeetingMakeModal';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiWon } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import styled from 'styled-components';
import { AuthButton } from '../../css/FormStyle';
import { Hr } from '../../css/SelectBoxStyle';
import format from 'date-fns/format';

const ClassMeetingContainer = styled.div`
  margin-bottom: 33px;
`;
const ClassMeetingTitle = styled.h3`
  margin-bottom: 16px;
`;

const ClassNotMeetingDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClassMeetingDay = styled.div`
  font-size: 14px;
`;

const MeetingInfoWrap = styled.div`
  width: 100%;
  margin-bottom: 14px;
  border-bottom: 1px solid rgb(200, 200, 200);
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;
const MeetingInfoThumnail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid rgb(200, 200, 200);
  width: 8%;
  border-radius: 4px;
`;

const MeetingInfoDay = styled.div`
  font-size: 14px;
`;
const MeetingInfoDate = styled.div`
  font-weight: bold;
  font-size: 21px;
`;

const MeetingInfoTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #6667ab;
`;

const MeetingInfo = styled.div`
  width: 80%;
`;

const MeetingInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MeetingAtendButton = styled.button`
  width: 8%;
  color: white;
  border-radius: 6px;
  background-color: #8dbad0;
`;

const PlusButton = styled.div`
  display: flex;
  margin-right: 4px;
`;

const dayArray = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const ClassMeeting = ({ admin, array }) => {
  const [modalState, setModalState] = useState(false);

  const ModalOpen = () => {
    setModalState(true);
  };

  const ModalClose = () => {
    setModalState(false);
  };

  return (
    <ClassMeetingContainer>
      <ClassMeetingTitle>모임 정모</ClassMeetingTitle>

      {array !== [] ? (
        <ClassMeetingDay>
          {array.map((v, i) => (
            <div key={i}>
              <MeetingInfoTitle>{v.title}</MeetingInfoTitle>
              <MeetingInfoWrap>
                <MeetingInfoThumnail>
                  <MeetingInfoDay>{dayArray[v.day.getDay()]}</MeetingInfoDay>
                  <MeetingInfoDate>
                    {format(v.day, 'dd') - format(new Date(), 'dd') === 0
                      ? '오늘'
                      : format(v.day, 'dd') - format(new Date(), 'dd') === 1
                      ? '내일'
                      : format(v.day, 'dd') - format(new Date(), 'dd') === 2
                      ? '모레'
                      : format(v.day, 'dd')}
                  </MeetingInfoDate>
                </MeetingInfoThumnail>
                <MeetingInfo>
                  <MeetingInfoItem>
                    <AiOutlineCalendar size="16px" style={{ marginRight: '4px' }} />
                    {format(v.day, 'MM월 dd일 ')}
                    {dayArray[v.day.getDay()]}
                    {format(v.day, ` ${'aaa' === 'pm' ? ' 오후 ' : ' 오전 '} hh시mm분`)}
                  </MeetingInfoItem>
                  <MeetingInfoItem>
                    <GrLocation size="16px" style={{ marginRight: '4px' }} />
                    {v.location}
                  </MeetingInfoItem>
                  <MeetingInfoItem>
                    <BiWon size="16px" style={{ marginRight: '4px' }} />
                    {v.price}
                  </MeetingInfoItem>
                </MeetingInfo>
                <MeetingAtendButton>참석</MeetingAtendButton>
              </MeetingInfoWrap>
            </div>
          ))}
        </ClassMeetingDay>
      ) : (
        <ClassNotMeetingDay>
          <AiOutlineCalendar size="18px" style={{ marginRight: '4px' }} />
          현재 정모가 없습니다.
        </ClassNotMeetingDay>
      )}

      {admin ? (
        <AuthButton color="rgb(180,180,180)" onClick={ModalOpen}>
          <PlusButton>
            <BsPlusCircleDotted />
          </PlusButton>
          정모 만들기
        </AuthButton>
      ) : (
        <AuthButton color="#00acee">가입하기</AuthButton>
      )}
      <Hr />
      <Modal modalState={modalState}>
        <MeetingMakeModal modalState={modalState} ModalClose={ModalClose} />
      </Modal>
    </ClassMeetingContainer>
  );
};

export default ClassMeeting;
