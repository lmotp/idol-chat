import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './NavBar';

const PageContainerBox = styled.section`
  width: 100%;
  height: 100%;
`;

const PageContainer = () => {
  return (
    <PageContainerBox>
      <Outlet />
      <NavBar />
    </PageContainerBox>
  );
};

export default PageContainer;
