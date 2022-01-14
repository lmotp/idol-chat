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
  background: ${(props) => (props.src ? `url(${props.src})` : 'white')} center no-repeat;
  background-size: cover;
  border: ${(props) => !props.src && '1px solid rgb(180,180,180)'};
  border-style: ${(props) => !props.src && 'dashed'};

  position: relative;
  order: ${(props) => props.order || '0'};
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

const ListInfoWrap = styled.div`
  width: ${(props) => props.width || '46%'};
  margin-left: ${(props) => props.ml || '-12px'};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.jc || 'space-between'};
  align-items: ${(props) => props.al || 'flex-start'};
  order: ${(props) => props.order || '0'};
`;

const InfoMember = styled.div`
  font-size: 14px;
  display: flex;
  order: ${(props) => props.order || '0'};
`;

const InfoCounter = styled.div`
  margin-left: 2px;
`;

const InfoMainTitle = styled.h2`
  font-weight: bold;
  font-size: 30px;
`;

const InfoSubTitle = styled.div`
  line-height: 1.5;
  font-size: 14px;
  height: ${(props) => props.height || '90px'};
  text-align: ${(props) => props.ta || 'auto'};
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

const ClassList = ({ v, on, od1, od2, od3, ml, al, ta }) => {
  const navigate = useNavigate();

  return (
    <ClassListContainer onClick={() => navigate(`/pages/class/${v._id}`)}>
      <ListThumbnailWrap src={v.thumnail} order={od3}>
        <HeartWrap>
          <BsHeartFill color={on ? 'red' : 'black'} />
        </HeartWrap>
      </ListThumbnailWrap>
      <ListInfoWrap width="54%" ml={ml} al={al} order={od2}>
        <InfoLocation mb="4px">
          <InfoLocationWrap>
            <GrLocation />
            {v.location.split(' ')[1]}
          </InfoLocationWrap>
        </InfoLocation>
        <InfoMainTitle>{v.className}</InfoMainTitle>
        <InfoSubTitle height="60px" ta={ta}>
          {v.classTarget}
        </InfoSubTitle>
        <InfoHasTagWrap>
          <InfoMainHasTag>{v.category}</InfoMainHasTag>
          {/* {v.hasTag.map((v, i) => {
            return <InfoHasTag key={i}>#{v}</InfoHasTag>;
          })} */}
        </InfoHasTagWrap>
      </ListInfoWrap>
      <InfoMember order={od1}>
        <HiUsers />
        <InfoCounter>{v.member.length}</InfoCounter>
      </InfoMember>
    </ClassListContainer>
  );
};

export default ClassList;
