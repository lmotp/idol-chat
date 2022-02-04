import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { format, getDay } from 'date-fns';
import { GrLocation } from 'react-icons/gr';
import { BiTimeFive } from 'react-icons/bi';
import Calendars from '../Pickers/Calendars';

const MyClassScheduleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(200, 200, 200);
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 5px;
`;

const ScheduleWrap = styled.div`
  width: 42%;
  padding-top: 10px;
`;

const ScheduleDayWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const ScheduleDate = styled.div``;
const ScheduleDay = styled.div`
  ${(props) =>
    props.day === 0 &&
    css`
      color: red;
    `}

  ${(props) =>
    props.day === 6 &&
    css`
      color: blue;
    `}
`;

const SchedulListWrap = styled.ul`
  color: #1d2429;
  overflow-y: scroll;
  height: 240px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
const List = styled.li`
  font-size: 14px;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 10px;
  }
`;

const ListClassName = styled.h3`
  font-size: 18px;
  cursor: pointer;
`;
const ListTitle = styled.div`
  margin-top: 3px;
  cursor: pointer;
`;

const ListInfoWrap = styled.div`
  display: flex;
`;

const ListTimeWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ListTime = styled.span`
  cursor: pointer;
`;

const ListLocationWrap = styled.div`
  margin-left: 4px;
  display: flex;
  align-items: center;
`;

const ListLocation = styled.span`
  cursor: pointer;
`;

const dayArray = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const MyClassSchedule = () => {
  const [date, setDate] = useState(new Date());
  const [fnsDay, setFnsDay] = useState(getDay(date));
  const [meetingDayValue, setMeetingDayValue] = useState(new Date());

  const SchedulList = [
    {
      className: '휘인과 딩가딩가',
      title: '오늘 한번 봅시다!',
      day: '12월 30일',
      time: format(new Date(), 'HH시 mm분'),
      location: '용산구',
    },
    {
      className: '휘인과 딩가딩가',
      title: '오늘 한번 봅시다!',
      day: '12월 30일',
      time: format(new Date(), 'HH시 mm분'),
      location: '용산구',
    },
    {
      className: '휘인과 딩가딩가',
      title: '오늘 한번 봅시다!',
      day: '12월 30일',
      time: format(new Date(), 'HH시 mm분'),
      location: '용산구',
    },
    {
      className: '휘인과 딩가딩가',
      title: '오늘 한번 봅시다!',
      day: '12월 30일',
      time: format(new Date(), 'HH시 mm분'),
      location: '용산구',
    },
  ];

  return (
    <MyClassScheduleContainer>
      <Calendars />
      <ScheduleWrap>
        <ScheduleDayWrap>
          <ScheduleDate>{format(date, 'yyyy년 MM월 dd일 ')}</ScheduleDate>
          <ScheduleDay day={fnsDay}>{dayArray[fnsDay]}</ScheduleDay>
        </ScheduleDayWrap>
        <SchedulListWrap>
          {SchedulList.filter((v) => v.day === format(date, 'MM월 dd일')).map((v, i) => {
            return (
              <List key={i}>
                <ListClassName>{v.className}</ListClassName>
                <ListTitle>{v.title}</ListTitle>

                <ListInfoWrap>
                  <ListTimeWrap>
                    <BiTimeFive />
                    <ListTime>{v.time}</ListTime>
                  </ListTimeWrap>
                  <ListLocationWrap>
                    <GrLocation />
                    <ListLocation>{v.location}</ListLocation>
                  </ListLocationWrap>
                </ListInfoWrap>
              </List>
            );
          })}
        </SchedulListWrap>
      </ScheduleWrap>
    </MyClassScheduleContainer>
  );
};

export default MyClassSchedule;
