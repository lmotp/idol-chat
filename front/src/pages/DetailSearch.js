import React from 'react';
import styled from 'styled-components';
import BackBar from '../components/BackBar';
import ClassSearch from '../components/ClassSearch';
import DetailSelectCategory from '../components/DetailSearch/DetailSelectCategory';
import DetailSearchList from '../components/DetailSearch/DetailSearchList';
import { useParams } from 'react-router-dom';

const DetailSearchContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const DetailSearch = () => {
  const { category } = useParams();

  return (
    <>
      <BackBar title={category} />
      <DetailSearchContainer>
        <ClassSearch pd="30px 0" />
        <DetailSelectCategory mainCategory={category} />
        <DetailSearchList />
      </DetailSearchContainer>
    </>
  );
};

export default DetailSearch;
