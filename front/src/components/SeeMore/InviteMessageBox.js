import React from 'react';
import { GrLocation } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdOutlineLocalPostOffice } from 'react-icons/md';

const InviteMessageBoxContianer = styled.ul`
  margin-bottom: 20px;
`;

const ListtHumbnail = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: ${(props) => props.width || '40%'};
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  order: ${(props) => props.order || '0'};
`;

const ListInfoWrap = styled.div`
  width: ${(props) => props.width || '46%'};
  margin-left: ${(props) => props.ml || '-12px'};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.jc || 'space-between'};
  align-items: ${(props) => props.al || 'flex-start'};
  order: ${(props) => props.order || '0'};
`;

const InfoMainTitle = styled.h2`
  font-weight: bold;
  font-size: 30px;
`;

const InfoHasTagWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.mt || '0'};
`;

const InfoMainHasTag = styled.span`
  margin-right: 10px;
  font-size: 12px;
  background: #db7093;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
`;

const InfoHasTag = styled.span`
  margin-right: 10px;
  font-size: 12px;
  color: black;
  cursor: pointer;
  border-radius: 3px;

  &: last-child {
    margin-right: 0;
  }
`;

const InfoLocation = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: ${(props) => props.mb || '0'};
  align-self: ${(props) => props.al || 'auto'};
`;

const InfoLocationWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(220, 220, 220);
  width: 64px;
  padding: 8px 6px;
  font-size: 13px;
  border-radius: 6px;
`;

const InviteMessageListWrap = styled.li`
  padding: 20px;
  height: 130px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 6px;
  display: flex;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 4px;
  }
`;

const InviteMessageTimeWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
`;
const InviteMessageDay = styled.div`
  font-size: 13px;
  margin: 0 6px 0 3px;
`;
const InviteMessageTime = styled.div`
  font-size: 13px;
`;

const InviteMessageBox = () => {
  const classList = useSelector((state) => state.classListReducer);

  return (
    <InviteMessageBoxContianer>
      {classList.map((v, i) => {
        return (
          <InviteMessageListWrap key={i}>
            <ListtHumbnail src={v.thumnail} width="16%" />
            <ListInfoWrap width="80%" ml="12px" jc="center">
              <InfoMainTitle>{v.mainTitle}</InfoMainTitle>
              <InfoHasTagWrap mt="4px">
                <InfoMainHasTag>{v.mainTag}</InfoMainHasTag>
                {v.hasTag.map((v, i) => {
                  return <InfoHasTag key={i}>#{v}</InfoHasTag>;
                })}
              </InfoHasTagWrap>
              <InviteMessageTimeWrap>
                <MdOutlineLocalPostOffice size="15px" />
                <InviteMessageDay>12월 27일</InviteMessageDay>
                <InviteMessageTime>오후10시47분</InviteMessageTime>
              </InviteMessageTimeWrap>
            </ListInfoWrap>
            <InfoLocation al="flex-start">
              <InfoLocationWrap>
                <GrLocation />
                {v.location}
              </InfoLocationWrap>
            </InfoLocation>
          </InviteMessageListWrap>
        );
      })}
    </InviteMessageBoxContianer>
  );
};

export default InviteMessageBox;
