import React from 'react';
import styled from 'styled-components';
import { HiUsers } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';

const HomeClassListContainer = styled.div`
  width: 100%;
  padding: 3%;
  border-radius: 3px;
  border: 1px solid rgb(200, 200, 200);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;

const ListtHumbnail = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 40%;
  height: 250px;
  border-radius: 10px;
  object-fit: cover;
`;

const ListInfoWrap = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const InfoMember = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  display: flex;
`;

const InfoCounter = styled.div`
  margin-left: 2px;
`;

const InfoMainTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 12px;
  font-size: 33px;
`;

const InfoSubTitle = styled.div`
  line-height: 1.5;
  font-size: 14px;
  margin-bottom: 36px;
`;

const InfoHasTagWrap = styled.div`
  display: flex;
  align-items: center;
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
  margin-bottom: 8px;
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

const HomeClassList = ({ v }) => {
  return (
    <HomeClassListContainer>
      <ListtHumbnail src={v.thumnail} />
      <ListInfoWrap>
        <InfoLocation>
          <InfoLocationWrap>
            <GrLocation />
            {v.location}
          </InfoLocationWrap>
        </InfoLocation>
        <InfoMainTitle>{v.mainTitle}</InfoMainTitle>
        <InfoSubTitle>{v.subTitle}</InfoSubTitle>
        <InfoHasTagWrap>
          <InfoMainHasTag>{v.mainTag}</InfoMainHasTag>
          {v.hasTag.map((v, i) => {
            return <InfoHasTag key={i}>#{v}</InfoHasTag>;
          })}
        </InfoHasTagWrap>
      </ListInfoWrap>
      <InfoMember>
        <HiUsers />
        <InfoCounter>{v.memberCount}</InfoCounter>
      </InfoMember>
    </HomeClassListContainer>
  );
};

export default HomeClassList;
