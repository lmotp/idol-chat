import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ButtonWrap, ModifyButton, ModifyInfoInput } from '../../css/ModifyStyle';
import format from 'date-fns/format';
import { BiWon } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { ClassMemberCount, ClassMemberCountWrap } from '../../css/FormStyle';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import axios from 'axios';
import DatePickerWrap from '../Pickers/DatePickerWrap';
import { parseISO } from 'date-fns';

const MeetingMakeModalContainer = styled.div`
  width: 90%;
  height: 372px;
  margin: 0 auto;
  padding: 33px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MeetingWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MeetingDayWrap = styled.div`
  width: 100%;
  height: 86px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const MeetingInfoThumnail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid rgb(200, 200, 200);
  width: 18%;
  height: 100%;
  border-radius: 4px;
`;

const MeetingDayValueWrap = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MeetingInfoDay = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;
const MeetingInfoDate = styled.div`
  font-weight: bold;
  font-size: 21px;
  margin-bottom: 4px;
`;

const MeetingInfoTime = styled.div`
  font-size: 12px;
`;

const daysArray = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const now = new Date();

const MeetingMakeModal = ({ ModalClose, classId, setLoading }) => {
  const meetingNameRef = useRef();
  const meetingPlaceRef = useRef();
  const meetingPriceRef = useRef();
  const meetingMemberCountRef = useRef(20);
  const timeRef = useRef();
  const [meetingDayValue, setMeetingDayValue] = useState(new Date());
  const [meetingTimeValue, setMeetingTimeValue] = useState(format(new Date(), 'HH:mm'));

  const MakeMeetingFunc = () => {
    const meetingValueObj = {
      name: meetingNameRef.current.value,
      place: meetingPlaceRef.current.value,
      price: meetingPriceRef.current.value,
      memberCount: meetingMemberCountRef.current,
      day: meetingDayValue,
      time: meetingTimeValue,
      classId,
    };

    axios.post('/api/meeting/make', meetingValueObj).then((data) => {
      setLoading(true);
      ModalClose();
    });
  };

  console.log(format(meetingDayValue, 'dd'));

  return (
    <>
      <MeetingMakeModalContainer>
        {/* 정모이름 */}
        <MeetingWrap>
          <ModifyInfoInput ref={meetingNameRef} type="text" placeholder="정모 이름을 적어주세요." />
        </MeetingWrap>

        {/* 정모날짜 */}
        <MeetingDayWrap>
          <MeetingDayValueWrap>
            <MeetingWrap>
              <AiOutlineCalendar size="18px" style={{ marginRight: '8px' }} />
              <DatePickerWrap meetingDayValue={meetingDayValue} setMeetingDayValue={setMeetingDayValue} />
            </MeetingWrap>

            {/* 정모시간 */}
            <MeetingWrap>
              <AiOutlineClockCircle size="18px" style={{ marginRight: '8px' }} />
              <ModifyInfoInput
                style={{ cursor: 'pointer' }}
                type="time"
                placeholder="모일 시간을 적어주세요."
                onChange={(e) => {
                  setMeetingTimeValue(e.target.value);
                }}
                value={meetingTimeValue}
                ref={timeRef}
                pd="6px 9px !important;"
              />
            </MeetingWrap>
          </MeetingDayValueWrap>

          <MeetingInfoThumnail>
            <MeetingInfoDay>{daysArray[meetingDayValue.getDay()]}</MeetingInfoDay>
            <MeetingInfoDate>
              {format(meetingDayValue, 'dd') - format(new Date(), 'dd') === 0
                ? '오늘'
                : format(meetingDayValue, 'dd') - format(new Date(), 'dd') === 1
                ? '내일'
                : format(meetingDayValue, 'dd') - format(new Date(), 'dd') === 2
                ? '모레'
                : `${format(meetingDayValue, 'dd')}일`}
            </MeetingInfoDate>
            <MeetingInfoTime>{`${
              meetingTimeValue.split(':')[0] > 12 ? '오후' : '오전'
            } ${meetingTimeValue}`}</MeetingInfoTime>
          </MeetingInfoThumnail>
        </MeetingDayWrap>

        {/* 정모장소 */}
        <MeetingWrap>
          <GrLocation size="18px" style={{ marginRight: '8px' }} />
          <ModifyInfoInput ref={meetingPlaceRef} type="text" placeholder="모일 곳을 적어주세요." />
        </MeetingWrap>

        {/* 정모비용 */}
        <MeetingWrap>
          <BiWon size="18px" style={{ marginRight: '8px' }} />
          <ModifyInfoInput ref={meetingPriceRef} type="text" placeholder="정모 비용을 적어주세요." />
        </MeetingWrap>

        <ClassMemberCountWrap mt="0">
          <ClassMemberCount>
            <BsFillPersonPlusFill size="18px" style={{ marginRight: '10px' }} />
            정원 (20 ~ 20명)
          </ClassMemberCount>
          <ModifyInfoInput
            meetingMemberCountRef={meetingMemberCountRef}
            al="center"
            width="10%"
            type="text"
            placeholder="20"
          />
        </ClassMemberCountWrap>
      </MeetingMakeModalContainer>

      <ButtonWrap>
        <ModifyButton onClick={MakeMeetingFunc}>만들기</ModifyButton>
        <ModifyButton onClick={ModalClose}>취소</ModifyButton>
      </ButtonWrap>
    </>
  );
};

export default MeetingMakeModal;
