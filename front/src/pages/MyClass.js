import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MyClassList from '../components/MyClass/MyClassList';
import MyClassSchedule from '../components/MyClass/MyClassSchedule';
import SelectCategory from '../components/SelectCategory';

const MyClassContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 70px;
`;

const MyClassTitle = styled.h2`
  font-size: 21px;
  padding-top: 36px;
`;

const MyClass = () => {
  const classList = useSelector((state) => state.classListReducer);

  return (
    <MyClassContainer>
      <MyClassTitle>가입한 모임</MyClassTitle>
      <SelectCategory />
      <MyClassSchedule />
      {classList.map((v, i) => {
        return <MyClassList v={v} key={i} />;
      })}
    </MyClassContainer>
  );
};

export default MyClass;
