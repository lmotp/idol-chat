import React, { useEffect, useRef } from 'react';
import { Form, Input } from '@/design-system/styles/FormStyle';
import { BiSearch } from 'react-icons/bi';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

const SearchInputWrap = styled.div<{ border?: string }>`
  display: flex;
  align-items: center;
  border-bottom: ${({ border }) => border || '1px solid black'};
  padding-left: 6px;
`;

const ClassSearch = ({ pd }: { pd?: string }) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  }, [pathname]);

  const searchTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/pages/search/${searchRef.current?.value ?? ''}`, {
      state: { searchCategory: searchRef.current?.value ?? '', example: null },
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
