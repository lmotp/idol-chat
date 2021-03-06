import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const ModalShow = keyframes`
  from {
    opacity: 0;
    margin-top: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`;

const ModalBgShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  ${(props) =>
    (props.modalState || props.errorModal) &&
    css`
      display: flex;
      align-items: center;
      animation: ${ModalBgShow} 0.3s;
    `}
`;

const ModalContent = styled.div`
  width: ${(props) => props.width || '470px'};
  height: auto;
  padding-bottom: 0;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: ${ModalShow} 0.3s;
  overflow: hidden;
`;

const Modal = ({ modalState, children, errorModal }) => {
  return (
    <ModalContainer modalState={modalState} errorModal={errorModal}>
      <ModalContent width="540px">{children}</ModalContent>
    </ModalContainer>
  );
};

export default Modal;
