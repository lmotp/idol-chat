import React from 'react';
import styled from 'styled-components';
import ClassCategorySelect from '../components/Search/ClassCategorySelect';
import ClassSearch from '../components/ClassSearch';

const SearchContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 66px;
`;

const Search = () => {
  return (
    <SearchContainer>
      <ClassSearch pd="56px 0 40px 0" />
      <ClassCategorySelect />
    </SearchContainer>
  );
};

export default Search;
