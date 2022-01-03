import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ClassList from '../ClassList';

const DetailSearchListContainer = styled.div`
  margin-top: 24px;
`;
const DetailLocation = styled.h2`
  margin-bottom: 12px;
`;

const DetailSearchList = () => {
  const { location } = useSelector((state) => state.userCheckReducers.result);
  const classList = useSelector((state) => state.classListReducer);
  const [mainLocation, setMainLocation] = useState('');

  useEffect(() => {
    const locationArray = location.split(' ');
    setMainLocation(locationArray[0]);
  }, [location]);

  return (
    <DetailSearchListContainer>
      <DetailLocation>{mainLocation}</DetailLocation>
      {classList.map((v, i) => {
        return <ClassList on="true" v={v} key={i} />;
      })}
    </DetailSearchListContainer>
  );
};

export default DetailSearchList;
