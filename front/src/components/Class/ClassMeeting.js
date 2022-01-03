import React from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import styled from 'styled-components';
import { AuthButton } from '../../css/FormStyle';

const ClassMeetingContainer = styled.div``;
const ClassMeetingTitle = styled.h3`
  margin-bottom: 30px;
`;

const ClassMeetingDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlusButton = styled.div`
  display: flex;
  margin-right: 4px;
`;

const ClassMeeting = ({ admin }) => {
  return (
    <ClassMeetingContainer>
      <ClassMeetingTitle>모임 정모</ClassMeetingTitle>
      <ClassMeetingDay>
        <AiOutlineCalendar size="18px" style={{ marginRight: '4px' }} />
        현재 정모가 없습니다.
      </ClassMeetingDay>
      {admin ? (
        <AuthButton color="rgb(180,180,180)">
          <PlusButton>
            <BsPlusCircleDotted />
          </PlusButton>
          정모 만들기
        </AuthButton>
      ) : (
        <AuthButton color="#00acee">가입하기</AuthButton>
      )}
    </ClassMeetingContainer>
  );
};

export default ClassMeeting;
