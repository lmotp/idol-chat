import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import ClassInfo from '@/components/Class/ClassInfo';
import ClassMainImg from '@/components/Class/ClassMainImg';
import ClassMeeting from '@/components/Class/ClassMeeting';
import ClassMember from '@/components/Class/ClassMember';
import Loading from '@/components/Loading';
import useAppStore from '@/stores/useAppStore';
import type { ClassMeetingRecord, ClassMemberRecord, ClassSummary } from '@/types/domain/class';
const ClassContainer = styled.div`
  width: 90%;
  padding-bottom: 90px;
  margin: 0 auto;
`;

const Class = () => {
  const { id } = useParams(); // 모임아이디
  const user = useAppStore((state) => state.user.result); //유저아이디
  const classJoinState = useAppStore((state) => state.classJoinState);
  const [classInfo, setClassInfo] = useState<ClassSummary | null>(null);
  const [memberInfo, setMemberInfo] = useState<ClassMemberRecord[]>([]);
  const [adminMember, setAdminMember] = useState<ClassMemberRecord[]>([]);
  const [meetingList, setMeetingList] = useState<ClassMeetingRecord[]>([]);
  const [joinState, setJoinState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (id) {
        axios.get(`/api/class/info/${id}`).then(({ data }) => {
          setClassInfo(data[0]);
          setMeetingList(data[0].meetingDay ?? []);
          setJoinState(data[0].member.includes(user?._id ?? ''));
        });

        axios.get(`/api/class/info/member/${id}`).then(({ data }) => {
          setMemberInfo(data);
          setAdminMember(data.filter((v: ClassMemberRecord) => v.classes === '모임장'));
          setLoading(true);
        });
      }
  }, [id, user?._id, classJoinState]);

  return (
    <>
      {loading && classInfo ? (
        <>
          <ClassMainImg
            admin={user?._id === classInfo.makeUser}
            img={classInfo.thumnail}
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
