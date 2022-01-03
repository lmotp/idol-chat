import React from 'react';
import { GrLocation } from 'react-icons/gr';
import { IoIosMore } from 'react-icons/io';
import styled from 'styled-components';
const ClassInfoContainer = styled.div`
  margin-bottom: 24px;
`;
const InfoHeader = styled.div`
  width: 100%;
  margin: 24px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(200, 200, 200);
`;

const TitleInfoWrap = styled.div`
  display: flex;
  align-items: center;
`;

const InfoLocation = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-right: 12px;
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

const InfoTitle = styled.h2``;

const InfoTagWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const InfoMainTag = styled.div`
  margin-right: 10px;
  font-size: 14px;
  background: #db7093;
  color: white;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 3px;
`;

const InfoHashTag = styled.div`
  margin-right: 10px;
  font-size: 14px;
`;

const InfoContent = styled.p`
  white-space: pre-wrap;
`;

const ClassInfo = ({ title, subTitle, location, hashTag, mainTag, admin }) => {
  return (
    <ClassInfoContainer>
      <InfoHeader>
        <TitleInfoWrap>
          <InfoLocation>
            <InfoLocationWrap>
              <GrLocation />
              {location}
            </InfoLocationWrap>
          </InfoLocation>
          <InfoTitle>{title}</InfoTitle>
        </TitleInfoWrap>
        {admin && <IoIosMore size="24px" cursor="pointer" />}
      </InfoHeader>
      <InfoTagWrap>
        <InfoMainTag>#{mainTag}</InfoMainTag>
        {hashTag.map((v) => (
          <InfoHashTag>#{v}</InfoHashTag>
        ))}
      </InfoTagWrap>
      <InfoContent>{subTitle}</InfoContent>
    </ClassInfoContainer>
  );
};

export default ClassInfo;
