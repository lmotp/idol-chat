import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ClassInfo from '../components/Class/ClassInfo';
import ClassMainImg from '../components/Class/ClassMainImg';
import ClassMeeting from '../components/Class/ClassMeeting';
import ClassMember from '../components/Class/ClassMember';
import Loading from '../components/Loading';
const ClassContainer = styled.div`
  width: 90%;
  padding-bottom: 90px;
  margin: 0 auto;
`;

const Class = () => {
  const { id } = useParams(); // 모임아이디
  const user = useSelector((state) => state.userCheckReducers.result); //유저아이디
  const classJoinState = useSelector((state) => state.classJoinReducer);
  const [classInfo, setClassInfo] = useState([]);
  const [memberInfo, setMemberInfo] = useState([]);
  const [adminMember, setAdminMember] = useState('');
  const [meetingList, setMeetingList] = useState([]);
  const [joinState, setJoinState] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/api/class/info/${id}`).then(({ data }) => {
        setClassInfo(data[0]);
        setMeetingList(data[0].meetingDay);
        setJoinState(data[0].member.includes(user?._id));
        console.log(data);
      });

      axios.get(`/api/class/info/member/${id}`).then(({ data }) => {
        console.log(data);
        setMemberInfo(data);
        setAdminMember(data.filter((v) => v.classes === '모임장'));
      });
    }
  }, [id, user?._id, classJoinState]);

  return (
    <>
      {!classJoinState ? (
        <>
          <ClassMainImg
            admin={user?._id === classInfo.makeUser}
            img={classInfo.thumnail}
            title={classInfo.className}
            classTarget={classInfo.classTarget}
            id={id}
          />
          <ClassContainer>
            <ClassInfo
              admin={user?._id === classInfo.makeUser}
              title={classInfo.className}
              classTarget={classInfo.classTarget}
              location={classInfo.location?.split(' ')[1]}
              hashTag={classInfo.hashTag}
              category={classInfo.category}
              id={id}
            />
            <ClassMeeting
              admin={user?._id === classInfo.makeUser}
              userId={user?._id}
              classId={id}
              joinState={joinState}
              meetingList={meetingList}
              setMeetingList={setMeetingList}
            />
            <ClassMember
              memberInfo={memberInfo}
              adminMember={adminMember}
              joinState={joinState}
              userId={user?._id}
              classId={id}
              classJoinState={classJoinState}
              classInfo={classInfo}
              admin={user?._id === classInfo.makeUser}
            />
          </ClassContainer>
        </>
      ) : (
        <ClassContainer>
          <Loading />
        </ClassContainer>
      )}
    </>
  );
};

export default Class;
