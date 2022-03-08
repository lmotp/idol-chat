import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';
import { BsHeartFill } from 'react-icons/bs';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ClassListContainer = styled.div`
  width: 100%;
  height: 210px;
  padding: 3%;
  border-radius: 3px;
  border: 1px solid rgb(200, 200, 200);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ListThumbnailWrap = styled.div`
  width: 30%;
  border-radius: 6px;
  background: ${(props) => (props.src ? 'url(' + props.src + ')' : 'white')} center no-repeat;
  background-size: cover;
  border: 1px dashed rgb(180, 180, 180);
  border-style: ${(props) => (props.src ? 'solid' : 'dashed')};

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
  background: rgba(255, 255, 255, 0.5);
`;

const ListInfoWrap = styled.div`
  width: ${(props) => props.width || '46%'};
  margin-left: -12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const InfoMember = styled.div`
  font-size: 14px;
  display: flex;
`;

const InfoCounter = styled.div`
  margin-left: 2px;
`;

const InfoMainTitle = styled.h2`
  width: 100%;

  font-size: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const InfoSubTitle = styled.div`
  line-height: 1.3;
  font-size: 14px;
  height: ${(props) => props.height || '54px'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const InfoHashTagWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.mt || '4px'};
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

const InfoHashTag = styled.span`
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

const ClassList = ({ v, on }) => {
  const navigate = useNavigate();

  return (
    <ClassListContainer onClick={() => navigate(`/pages/class/${v._id}`)}>
      <ListThumbnailWrap src={v.thumnail}>
        <HeartWrap>
          <BsHeartFill color={on ? 'red' : 'rgba(200,200,200,0.8)'} />
        </HeartWrap>
      </ListThumbnailWrap>
      <ListInfoWrap width="54%">
        <InfoLocation mb="4px">
          <InfoLocationWrap>
            <GrLocation />
            {v?.location.split(' ')[1]}
          </InfoLocationWrap>
        </InfoLocation>
        <InfoMainTitle>{v.className}</InfoMainTitle>
        <InfoSubTitle height="54px">{v.classTarget}</InfoSubTitle>
        <InfoHashTagWrap>
          <InfoMainHasTag>{v.category}</InfoMainHasTag>
          {v.hashTag.map((v, i) => {
            return <InfoHashTag key={i}>#{v}</InfoHashTag>;
          })}
        </InfoHashTagWrap>
      </ListInfoWrap>
      <InfoMember>
        <HiUsers />
        <InfoCounter>{v.member.length}</InfoCounter>
      </InfoMember>
    </ClassListContainer>
  );
};

export default ClassList;
