import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';
import {
  HomeClassListContainer,
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
  ListtHumbnail,
} from '../../css/ClassListStyle';

const MyClassList = ({ v }) => {
  return (
    <HomeClassListContainer height="210px">
      <ListtHumbnail src={v.thumnail} width="30%" order="3" />
      <ListInfoWrap width="56%" ml="0" al="flex-end" order="2">
        <InfoLocation mb="4px">
          <InfoLocationWrap>
            <GrLocation />
            {v.location}
          </InfoLocationWrap>
        </InfoLocation>
        <InfoMainTitle>{v.mainTitle}</InfoMainTitle>
        <InfoSubTitle height="60px" ta="right">
          {v.subTitle}
        </InfoSubTitle>
        <InfoHasTagWrap>
          <InfoMainHasTag>{v.mainTag}</InfoMainHasTag>
          {v.hasTag.map((v, i) => {
            return <InfoHasTag key={i}>#{v}</InfoHasTag>;
          })}
        </InfoHasTagWrap>
      </ListInfoWrap>
      <InfoMember order="1">
        <HiUsers />
        <InfoCounter>{v.memberCount}</InfoCounter>
      </InfoMember>
    </HomeClassListContainer>
  );
};

export default MyClassList;
