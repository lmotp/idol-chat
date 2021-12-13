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
    props.modalState &&
    css`
      display: flex;
      align-items: center;
      animation: ${ModalBgShow} 0.3s;
    `}
`;

const ModalContent = styled.div`
  width: 470px;
  height: auto;
  padding-bottom: 20px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: ${ModalShow} 0.3s;
  overflow: hidden;
`;

const ModalButtonBox = styled.div`
  padding-top: 20px;
  text-align: center;
  border-top: 1px solid black;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  margin-right: 6px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background: black;
  cursor: pointer;
  display: inline-block;
  border-radius: 3px;
`;

const Modal = ({ modalState, children, ModalClose }) => {
  return (
    <ModalContainer modalState={modalState}>
      <ModalContent>
        {children}
        <ModalButtonBox>
          <ModalButton onClick={ModalClose}>취소</ModalButton>
        </ModalButtonBox>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
