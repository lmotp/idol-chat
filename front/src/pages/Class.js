import React, { useEffect, useState } from 'react';
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
  const { id } = useParams();
  const classList = useSelector((state) => state.classListReducer);
  const { _id } = useSelector((state) => state.userCheckReducers.result);
  const [classInfo, setClassInfo] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`/api/class/info/${id}`).then(({ data }) => {
        setClassInfo(data[0]);
        console.log(data[0].location.split(' ')[1]);
      });
    }
  }, [id]);

  const testMeetingDay = [
    { title: '얼굴 봅시다!', day: new Date(), location: '건대 (임시장소)', price: '엔빵' },
    { title: '얼굴 봅시다!', day: new Date(2022, 0, 5, 12, 31, 10), location: '건대 (임시장소)', price: '엔빵' },
    { title: '얼굴 봅시다!', day: new Date(2022, 0, 6, 12, 31, 10), location: '건대 (임시장소)', price: '엔빵' },
    { title: '얼굴 봅시다!', day: new Date(2022, 0, 9, 12, 31, 10), location: '건대 (임시장소)', price: '엔빵' },
  ];

  const testMember = [
    {
      profileImg: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트1호',
      mySelf: '안녕하세요? 잘 부탁드립니다',
      classes: '모임장',
    },
    {
      profileImg: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트1호',
      mySelf: '안녕하세요? 잘 부탁드립니다',
      classes: '운영진',
    },
    {
      profileImg: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
      nickName: '테스트1호',
      mySelf: '안녕하세요? 잘 부탁드립니다',
      classes: '회원',
    },
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
        <ClassMeeting admin={_id === classInfo.makeUser} array={testMeetingDay} userId={_id} classId={id} />
        <ClassMember array={classInfo} />
      </ClassContainer>
    </>
  );
};

export default Class;
