import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ClassInfo from '../components/Class/ClassInfo';
import ClassMainImg from '../components/Class/ClassMainImg';
import ClassMeeting from '../components/Class/ClassMeeting';
import ClassMember from '../components/Class/ClassMember';
const ClassContainer = styled.div`
  width: 90%;
  padding-bottom: 90px;
  margin: 0 auto;
`;

const Class = () => {
  const { id } = useParams(); // 모임아이디
  const { _id } = useSelector((state) => state.userCheckReducers.result); //유저아이디
  const classList = useSelector((state) => state.classListReducer);
  const [classInfo, setClassInfo] = useState([]);
  const [memberInfo, setMemberInfo] = useState([]);
  const [reloadState, setReloadState] = useState(false);
  const joinStateRef = useRef();

  useEffect(() => {
    if (id) {
      axios.get(`/api/class/info/${id}`).then(({ data }) => {
        setClassInfo(data[0]);
        joinStateRef.current = data[0].member.includes(_id);
      });
      axios.get(`/api/class/info/member/${id}`).then(({ data }) => {
        setMemberInfo(data);
      });
    }
  }, [id, _id]);

  const testMeetingDay = [
    { title: '얼굴 봅시다!', day: new Date(), location: '건대 (임시장소)', price: '엔빵' },
    { title: '얼굴 봅시다!', day: new Date(2022, 0, 5, 12, 31, 10), location: '건대 (임시장소)', price: '엔빵' },
    { title: '얼굴 봅시다!', day: new Date(2022, 0, 6, 12, 31, 10), location: '건대 (임시장소)', price: '엔빵' },
  ];

  return (
    <>
      <ClassMainImg img={classInfo.thumnail} title={classInfo.className} classTarget={classInfo.classTarget} />
      <ClassContainer>
        <ClassInfo
          admin={_id === classInfo.makeUser}
          title={classInfo.className}
          classTarget={classInfo.classTarget}
          location={classInfo.location?.split(' ')[1]}
          hashTag={classList[1].hasTag}
          category={classInfo.category}
        />
        <ClassMeeting
          admin={_id === classInfo.makeUser}
          array={testMeetingDay}
          userId={_id}
          classId={id}
          joinState={joinStateRef.current}
        />
        <ClassMember memberInfo={memberInfo} joinState={joinStateRef.current} userId={_id} classId={id} />
      </ClassContainer>
    </>
  );
};

export default Class;
