import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthButton } from '../../css/FormStyle';
import Loading from '../Loading';

const ClassMemberContainer = styled.div``;
const MemberTitle = styled.h3`
  margin-bottom: 16px;
`;

const MemberInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
`;

const MemberProfileImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 20%;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

const MemberInfoValue = styled.div`
  margin-left: 14px;
`;

const MemberNickName = styled.div`
  margin-bottom: 6px;
`;
const MemberMySelf = styled.p`
  font-size: 14px;
`;

const MemberClasses = styled.div`
  font-weight: ${(props) => (props.classes ? 'bold' : 'normal')};
  color: ${(props) => (props.classes ? '#6667ab' : 'black')};
`;

const ClassMember = ({ memberInfo, joinState, userId, classId, reloadState }) => {
  const navigate = useNavigate();

  const memberSecession = () => {
    axios.post('/api/class/info/secession/member', { userId, classId }).then(() => {
      navigate('/pages/home');
    });
  };

  return (
    <>
      {reloadState ? (
        <Loading />
      ) : (
        <ClassMemberContainer>
          <MemberTitle>모임 멤버 ({memberInfo.length}명)</MemberTitle>
          {memberInfo.map((v, i) => (
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
