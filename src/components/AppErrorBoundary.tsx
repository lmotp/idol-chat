import React from 'react';
import styled from '@emotion/styled';

const ErrorWrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f3f4f6;
`;

const ErrorCard = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 28px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
`;

const ErrorTitle = styled.h1`
  margin-bottom: 12px;
  font-size: 24px;
`;

const ErrorMessage = styled.p`
  margin-bottom: 20px;
  color: #4b5563;
  white-space: pre-wrap;
`;

const RetryButton = styled.button`
  padding: 10px 16px;
  border-radius: 10px;
  background: #111827;
  color: #fff;
`;

type Props = {
  error: unknown;
  onRetry: () => void;
};

export function AppErrorFallback({ error, onRetry }: Props) {
  const message = error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.';

  return (
    <ErrorWrap role="alert">
      <ErrorCard>
        <ErrorTitle>문제가 발생했습니다</ErrorTitle>
        <ErrorMessage>{message}</ErrorMessage>
        <RetryButton type="button" onClick={onRetry}>
          다시 시도
        </RetryButton>
      </ErrorCard>
    </ErrorWrap>
  );
}
