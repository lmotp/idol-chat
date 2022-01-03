import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BackBar from '../components/BackBar';
import ClassSearch from '../components/ClassSearch';
import DetailSelectCategory from '../components/DetailSearch/DetailSelectCategory';
import DetailSearchList from '../components/DetailSearch/DetailSearchList';

const DetailSearchContainer = styled.div`
  padding-bottom: 90px;
  width: 90%;
  margin: 0 auto;
`;

const DetailSearch = () => {
  const {
    state: { mainCategory },
  } = useLocation();

  return (
    <>
      <BackBar title={mainCategory} />
      <DetailSearchContainer>
        <ClassSearch pd="30px 0" />
        <DetailSelectCategory mainCategory={mainCategory} />
        <DetailSearchList />
      </DetailSearchContainer>
    </>
  );
};

export default DetailSearch;
