import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { format, getDay, parseISO } from 'date-fns';
import { GrLocation } from 'react-icons/gr';
import { BiTimeFive, BiWon } from 'react-icons/bi';
import Calendars from '../Pickers/Calendars';
import { useNavigate } from 'react-router-dom';

const MyClassScheduleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(200, 200, 200);
  padding: 10px 16px;
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
    width: 0;
    height: 0;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
const List = styled.li`
  font-size: 15px;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 10px;
  }
`;

const ListClassName = styled.h3`
  width: 100%;
  font-size: 18px;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const ListTitle = styled.div`
  margin-top: 6px;
  cursor: pointer;
`;

const ListInfoWrap = styled.div`
  display: flex;
  margin-top: 3px;
  font-size: 13px;
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

const MyClassSchedule = ({ myMeetinsList }) => {
  const [meetingDayValue, setMeetingDayValue] = useState(new Date());
  const navigate = useNavigate();
  console.log(myMeetinsList);

  return (
    <MyClassScheduleContainer>
      <Calendars
        myMeetinsList={myMeetinsList}
        meetingDayValue={meetingDayValue}
        setMeetingDayValue={setMeetingDayValue}
      />
      <ScheduleWrap>
        <ScheduleDayWrap>
          <ScheduleDate>{format(meetingDayValue, 'yyyy년 MM월 dd일 ')}</ScheduleDate>
          <ScheduleDay day={getDay(meetingDayValue)}>{dayArray[getDay(meetingDayValue)]}</ScheduleDay>
        </ScheduleDayWrap>
        <SchedulListWrap>
          {myMeetinsList
            .filter((v) => format(parseISO(v.day), 'MM월 dd일') === format(meetingDayValue, 'MM월 dd일'))
            .map((v) => {
              return (
                <List
                  key={v.classId._id}
                  onClick={() => {
                    navigate(`/pages/class/${v.classId._id}`);
                  }}
                >
                  <ListClassName>{v.classId.className}</ListClassName>
                  <ListTitle>{v.name}</ListTitle>

                  <ListInfoWrap>
                    <ListTimeWrap>
                      <BiTimeFive />
                      <ListTime>{v.time}</ListTime>
                    </ListTimeWrap>
                    <ListLocationWrap>
                      <GrLocation />
                      <ListLocation>{v.place}</ListLocation>
                    </ListLocationWrap>
                    <ListLocationWrap>
                      <BiWon />
                      {v.price}
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
