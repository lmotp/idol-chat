import React from 'react';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

const ContainerBox = styled.main`
  width: min(100%, 768px);
  min-height: 100vh;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    border-left: 0;
    border-right: 0;
    box-shadow: none;
  }
`;

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return <ContainerBox>{children}</ContainerBox>;
};

export default Container;
