import React from 'react';
import styled from 'styled-components';
import ClassCategorySelect from '../components/Search/ClassCategorySelect';
import ClassSearch from '../components/Search/ClassSearch';

const SearchContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 66px;
`;

const Search = () => {
  return (
    <SearchContainer>
      <ClassSearch />
      <ClassCategorySelect />
    </SearchContainer>
  );
};

export default Search;
