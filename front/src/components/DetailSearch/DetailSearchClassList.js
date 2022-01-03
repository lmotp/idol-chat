import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';
import { BsHeartFill } from 'react-icons/bs';
import {
  InfoCounter,
  InfoHasTag,
  InfoHasTagWrap,
  InfoLocation,
  InfoLocationWrap,
  InfoMainHasTag,
  InfoMainTitle,
  InfoMember,
  InfoSubTitle,
  ListInfoWrap,
} from '../../css/ClassListStyle';
import styled from 'styled-components';

const DetailSearchClassListContainer = styled.div`
  width: 100%;
  height: 210px;
  padding: 3%;
  border-radius: 3px;
  border: 1px solid rgb(200, 200, 200);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ListThumbnailWrap = styled.div`
  width: 30%;
  border-radius: 6px;
  background: url(${(props) => props.src}) center no-repeat;
  background-size: cover;
  position: relative;
`;

const HeartWrap = styled.div`
  position: absolute;
  border-radius: 50%;
  right: 10px;
  bottom: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

const DetailSearchClassList = ({ v, on }) => {
  console.log(v);
  return (
    <DetailSearchClassListContainer>
      <ListThumbnailWrap src={v.thumnail}>
        <HeartWrap>
          <BsHeartFill color={on ? 'red' : 'black'} />
        </HeartWrap>
      </ListThumbnailWrap>
      <ListInfoWrap width="54%" ml="-20px">
        <InfoLocation mb="4px">
          <InfoLocationWrap>
            <GrLocation />
            {v.location}
          </InfoLocationWrap>
        </InfoLocation>
        <InfoMainTitle>{v.mainTitle}</InfoMainTitle>
        <InfoSubTitle height="60px">{v.subTitle}</InfoSubTitle>
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
    </DetailSearchClassListContainer>
  );
};

export default DetailSearchClassList;
