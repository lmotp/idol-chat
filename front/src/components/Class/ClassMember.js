import React from 'react';
import styled from 'styled-components';

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

const ClassMember = ({ array }) => {
  console.log(array[0].classes);
  return (
    <ClassMemberContainer>
      <MemberTitle>모임 멤버 ({array.length}명)</MemberTitle>
      {array.map((v, i) => (
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
    </ClassMemberContainer>
  );
};

export default ClassMember;
