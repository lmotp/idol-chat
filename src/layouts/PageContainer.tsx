import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import CircleButton from '@/components/CircleButton';
import NavBar from '@/layouts/NavBar';

const PageContainerBox = styled.section`
  width: 100%;
  height: 100%;
  padding-bottom: 60px;
`;

const PageContainer = () => {
  return (
    <PageContainerBox>
      <Outlet />
      <CircleButton />
      <NavBar />
    </PageContainerBox>
  );
};

export default PageContainer;
