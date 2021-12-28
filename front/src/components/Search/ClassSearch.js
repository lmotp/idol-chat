import React, { useRef } from 'react';
import { Form, Input } from '../../css/FormStyle';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';

const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  padding-left: 6px;
`;

const ClassSearch = () => {
  const searchRef = useRef();

  return (
    <Form pd="56px 0 40px 0">
      <SearchInputWrap border="1px solid black">
        <BiSearch size="26px" />
        <Input placeholder="모임이나 커뮤니티를 검색하세요." ref={searchRef} border="none" fz="21px" ml="14px" />
      </SearchInputWrap>
    </Form>
  );
};

export default ClassSearch;
