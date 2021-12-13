import React from 'react';
import styled from 'styled-components';

const ContainerBox = styled.main`
  width: 768px;
  height: 100vh;

  // background: linear-gradient(0deg, rgba(181, 145, 161, 1) 0%, rgba(220, 174, 175, 1) 15%, rgba(250, 209, 189, 1) 100%);
  background: white;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Container = ({ children }) => {
  return <ContainerBox>{children}</ContainerBox>;
};

export default Container;
