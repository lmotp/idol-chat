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
