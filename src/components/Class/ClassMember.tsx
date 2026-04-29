import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { apiClient } from '@/app/apiClient';
import { AuthButton } from '@/design-system/styles/FormStyle';
import Loading from '@/components/Loading';
import ClassInvite from '@/components/Class/ClassInvite';
import type { ClassMemberRecord, ClassSummary } from '@/types/domain/class';
import type { SrcProp } from '@/types/ui/styled-props';

const ClassMemberContainer = styled.div``;
const MemberTitle = styled.h3`
  margin-bottom: 16px;
`;

const MemberInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
`;

const MemberProfileImg = styled.img<SrcProp>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  object-fit: cover;
`;

const MemberInfoValue = styled.div`
  margin-left: 14px;
  width: 85%;
`;

const MemberNickName = styled.div`
  margin-bottom: 6px;
  font-weight: bold;
`;
const MemberMySelf = styled.p`
  font-size: 14px;
`;

const MemberClasses = styled.div<{ classes?: boolean }>`
  font-weight: ${({ classes }) => (classes ? 'bold' : 'normal')};
  color: ${({ classes }) => (classes ? '#6667ab' : 'black')};
`;

type Props = {
  memberInfo: ClassMemberRecord[];
  adminMember: ClassMemberRecord[];
  joinState?: boolean;
  userId?: string;
  classId?: string;
  classJoinState?: boolean;
  classInfo: ClassSummary;
  admin?: boolean;
};

const ClassMember = ({ memberInfo, adminMember, joinState, userId, classId, classJoinState, classInfo, admin }: Props) => {
  const navigate = useNavigate();

  const memberSecession = () => {
    apiClient.post('/api/class/info/secession/member', { userId, classId }).then(({ data }) => {
      navigate('/pages/home');
    });
  };

  return (
    <>
      {classJoinState ? (
        <Loading />
      ) : (
        <ClassMemberContainer>
          <MemberTitle>모임 멤버 ({memberInfo.length}명)</MemberTitle>
          {adminMember.length > 0 && (
            <MemberInfoWrap>
              <MemberInfo>
                <MemberProfileImg src={adminMember[0].profileImg} />
                <MemberInfoValue>
                  <MemberNickName>{adminMember[0].nickName}</MemberNickName>
                  <MemberMySelf>{adminMember[0].mySelf}</MemberMySelf>
                </MemberInfoValue>
              </MemberInfo>
              <MemberClasses classes={adminMember[0].classes !== '회원'}>{adminMember[0].classes}</MemberClasses>
            </MemberInfoWrap>
          )}
          {memberInfo
            .filter((v) => v.classes === '회원')
            .map((v, i) => (
              <MemberInfoWrap key={i}>
                <MemberInfo>
                  <MemberProfileImg src={v.profileImg} />
                  <MemberInfoValue>
                    <MemberNickName>{v.nickName}</MemberNickName>
                    <MemberMySelf>{v.mySelf}</MemberMySelf>
                  </MemberInfoValue>
                </MemberInfo>
                <MemberClasses classes={v.classes !== '회원'}>{v.classes}</MemberClasses>
              </MemberInfoWrap>
            ))}
          {admin && (
            <ClassInvite category={classInfo.category} location={classInfo.location.split(' ')[1]} classId={classId ?? ''} />
          )}
          {joinState && (
            <AuthButton onClick={memberSecession} color="rgb(180,180,180)" margin="30px 0 0">
              모임나가기
            </AuthButton>
          )}
        </ClassMemberContainer>
      )}
    </>
  );
};

export default ClassMember;
