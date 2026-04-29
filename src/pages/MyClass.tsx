import React, { useEffect, useState } from 'react';
import { apiClient } from '@/app/apiClient';
import { BsPlusCircleDotted } from 'react-icons/bs';
import styled from '@emotion/styled';
import ClassList from '@/components/ClassList';
import MyClassSchedule from '@/components/MyClass/MyClassSchedule';
import SelectCategory from '@/components/SelectCategory';
import { Hr } from '@/design-system/styles/SelectBoxStyle';
import useAppStore from '@/stores/useAppStore';
import type { ClassMeetingRecord, ClassSummary } from '@/types/domain/class';

const MyClassContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const MyClassTitle = styled.h2`
  font-size: 21px;
  padding-top: 34px;
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
  height: 39vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyClass = () => {
  const _id = useAppStore((state) => state.user.result._id);
  const [myClassList, setMyClassList] = useState<ClassSummary[]>([]);
  const [myMeetinsList, setMyMeetingList] = useState<ClassMeetingRecord[]>([]);

  useEffect(() => {
    if (_id) {
      apiClient.get<ClassSummary[]>(`/api/class/list/my/${_id}`).then(({ data }) => {
        const meetingDayList = data.flatMap((v: ClassSummary) => v.meetingDay ?? []);
        setMyMeetingList(meetingDayList);
        setMyClassList(data);
      });
    }
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
            return <ClassList v={v} key={i} on />;
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
