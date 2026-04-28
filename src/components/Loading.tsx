import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/design-system/theme';
import type { HeightProp } from '@/types/ui/styled-props';

const Spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {

    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div<HeightProp>`
  min-height: ${({ height }) => height || '90vh'};
  display: grid;
  place-items: center;
`;

const LoadingItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-radius: ${theme.radii.round};
  background: ${theme.colors.surfaceElevated};
  box-shadow: ${theme.shadow.soft};
  color: ${theme.colors.textMuted};
  font-weight: 600;

  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid ${theme.colors.primarySoft};
    border-top-color: ${theme.colors.primary};
    animation: ${Spinner} 0.9s linear infinite;
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingItem>로딩중...</LoadingItem>
    </LoadingContainer>
  );
};

export default Loading;
