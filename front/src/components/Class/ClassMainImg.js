import React, { useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import ModifyClassModal from '../Modal/ModifyClassModal';

const ClassMainImgWrap = styled.div`
  width: 100%;
  height: 30vh;
  background: ${(props) => (props.src ? `url(${props.src})` : 'rgb(200,200,200)')} center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  ::after {
    position: absolute;
    content: '';
    display: ${(props) => (props.hover ? 'block' : 'none')};
    top: 0;
    left: 0;
    width: 100%;
    height: inherit;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const ClassMainImgWrapNoAdmin = styled.div`
  width: 100%;
  height: 30vh;
  background: ${(props) => (props.src ? `url(${props.src})` : 'rgb(200,200,200)')} center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClassMainImg = ({ img, title, classTarget, admin, id, setReloadState }) => {
  const [hoverState, setHoverState] = useState(false);
  const [modalState, setModalState] = useState(false);

  const ModalOpen = () => {
    setModalState(true);
  };
  const ModalClose = () => {
    setModalState(false);
  };

  return (
    <>
      {admin ? (
        <>
          <ClassMainImgWrap
            src={img}
            hover={hoverState}
            onMouseEnter={() => {
              setHoverState(true);
            }}
            onMouseLeave={() => {
              setHoverState(false);
            }}
            onClick={ModalOpen}
          >
            {!img && <AiOutlinePicture size="33px" color="black" />}
          </ClassMainImgWrap>
          <Modal modalState={modalState}>
            <ModifyClassModal
              modalState={modalState}
              ModalClose={ModalClose}
              title={title}
              classTarget={classTarget}
              img={img}
              id={id}
              setReloadState={setReloadState}
            />
          </Modal>
        </>
      ) : (
        <ClassMainImgWrapNoAdmin src={img}>
          {!img && <AiOutlinePicture size="33px" color="black" />}
        </ClassMainImgWrapNoAdmin>
      )}
    </>
  );
};

export default ClassMainImg;
