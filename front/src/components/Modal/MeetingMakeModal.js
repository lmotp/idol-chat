import React from 'react';
import styled from 'styled-components';
import { ButtonWrap, ModifyButton, ModifyInfoInput } from '../../css/ModifyStyle';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';

const MeetingMakeModalContainer = styled.div`
  width: 95%;
  margin: 0 auto;
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

const daysArray = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const MeetingMakeModal = ({ ModalClose }) => {
  console.log(daysArray);
  return (
    <>
      <MeetingMakeModalContainer>
        <ModifyInfoInput />
        <ModifyInfoInput />
        {/* <MeetingInfoDay>{daysArray[0]}</MeetingInfoDay>
          <MeetingInfoDate>
            {format('dd') - format(new Date(), 'dd') === 0
              ? '오늘'
              : format('dd') - format(new Date(), 'dd') === 1
              ? '내일'
              : format('dd') - format(new Date(), 'dd') === 2
              ? '모레'
              : format('dd')}
          </MeetingInfoDate> */}
        <ModifyInfoInput />
        <ModifyInfoInput />
        <ModifyInfoInput />
        <MeetingInfoThumnail></MeetingInfoThumnail>
      </MeetingMakeModalContainer>
      <ButtonWrap>
        <ModifyButton>실행</ModifyButton>
        <ModifyButton onClick={ModalClose}>취소</ModifyButton>
      </ButtonWrap>
    </>
  );
};

export default MeetingMakeModal;
