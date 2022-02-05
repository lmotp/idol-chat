import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ClassList from '../components/ClassList';
import MyClassSchedule from '../components/MyClass/MyClassSchedule';
import SelectCategory from '../components/SelectCategory';
import { Hr } from '../css/SelectBoxStyle';
import { format, parseISO } from 'date-fns';

const MyClassContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const MyClassTitle = styled.h2`
  font-size: 21px;
  padding-top: 36px;
`;

const ClassListWrap = styled.div`
  height: 44vh;
  padding-bottom: 90px;
  overflow-y: scroll;
  margin-top: 20px;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const MyClassListNone = styled.div`
  width: 100%;
  height: 34vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyClass = () => {
  const { _id } = useSelector((state) => state.userCheckReducers.result);
  const [myClassList, setMyClassList] = useState([]);
  const [myMeetinsList, setMyMeetingList] = useState([]);

  useEffect(() => {
    axios.get(`/api/class/list/my/${_id}`).then(({ data }) => {
      const meetingDayList = data
        .map((v) => v.meetingDay)
        .flat()
        .map((v) => format(parseISO(v.day), 'dd-MM-yyyy'));

      setMyMeetingList(meetingDayList);
      setMyClassList(data);
    });
  }, [_id]);

  return (
    <MyClassContainer>
      <MyClassTitle>가입한 모임</MyClassTitle>
      <SelectCategory />
      <MyClassSchedule myMeetinsList={myMeetinsList} />
      <Hr />
      <ClassListWrap>
        {myClassList.length > 0 ? (
          myClassList.map((v, i) => {
            return <ClassList v={v} key={i} on="true" />;
          })
        ) : (
          <MyClassListNone>
            지금 모임에 가입해보세요
            <BsPlusCircleDotted style={{ marginLeft: '6px' }} />
          </MyClassListNone>
        )}
      </ClassListWrap>
    </MyClassContainer>
  );
};

export default MyClass;
