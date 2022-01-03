import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ClassInfo from '../components/Class/ClassInfo';
import ClassMainImg from '../components/Class/ClassMainImg';
import ClassMeeting from '../components/Class/ClassMeeting';
const ClassContainer = styled.div`
  width: 90%;
  height: 70vh;
  padding-bottom: 90px;
  margin: 0 auto;
`;

const Class = () => {
  const { id } = useParams();
  const classList = useSelector((state) => state.classListReducer);

  console.log(classList);

  return (
    <>
      <ClassMainImg img={classList[id].thumnail} />
      <ClassContainer>
        <ClassInfo
          admin="true"
          title={classList[id].mainTitle}
          subTitle={classList[id].subTitle}
          location={classList[id].location}
          hashTag={classList[id].hasTag}
          mainTag={classList[id].mainTag}
        />
        <ClassMeeting admin="true" />
      </ClassContainer>
    </>
  );
};

export default Class;
