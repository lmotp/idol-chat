import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {

    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  height: ${(props) => props.height || '90vh'};
`;

const LoadingItem = styled.div`
  position: relative;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  top: 450px;
  left: 50%;

  &:before {
    content: '';
    display: block;
    position: absolute;
  }

  &:not(:required) {
    /* hide "loading..." text */
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  &:not(:required):after {
    content: '';
    display: block;
    font-size: 10px;
    width: 1em;
    height: 1em;
    margin-top: -0.5em;
    animation: ${Spinner} 1500ms infinite linear;
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
      rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0,
      rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
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
