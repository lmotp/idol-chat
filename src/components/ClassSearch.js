import React, { useEffect, useRef } from 'react';
import { Form, Input } from '../css/FormStyle';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  padding-left: 6px;
`;

const ClassSearch = ({ pd }) => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    searchRef.current.value = '';
  }, [pathname]);

  const searchTag = (e) => {
    e.preventDefault();
    navigate(`/pages/search/${searchRef.current.value}`, {
      state: { searchCategory: searchRef.current.value, example: null },
    });
  };

  return (
    <Form pd={pd} onSubmit={searchTag}>
      <SearchInputWrap border="1px solid black">
        <BiSearch size="26px" />
        <Input placeholder="찾으실 태그로 검색해주세요!" ref={searchRef} border="none" fz="21px" ml="14px" />
      </SearchInputWrap>
    </Form>
  );
};

export default ClassSearch;
