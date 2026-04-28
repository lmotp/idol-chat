import React, { useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import styled from '@emotion/styled';
import { overlay } from 'overlay-kit';
import Modal from '@/components/Modal/Modal';
import ModifyClassImg from '@/components/Modal/ModifyClassImg';
import type { HoverProp, SrcProp } from '@/types/ui/styled-props';

type ClassMainImgProps = {
  img?: string;
  admin?: boolean;
  id?: string;
};

const ClassMainImgWrap = styled.div<SrcProp & HoverProp>`
  width: 100%;
  height: 30vh;
  background: ${({ src }) => (src ? `url(${src})` : 'rgb(200,200,200)')} center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  ::after {
    position: absolute;
    content: '';
    display: ${({ hover }) => (hover ? 'block' : 'none')};
    top: 0;
    left: 0;
    width: 100%;
    height: inherit;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const ClassMainImgWrapNoAdmin = styled.div<SrcProp>`
  width: 100%;
  height: 30vh;
  background: ${({ src }) => (src ? `url(${src})` : 'rgb(200,200,200)')} center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClassMainImg = ({ img, admin, id }: ClassMainImgProps) => {
  const [hoverState, setHoverState] = useState(false);

  const ModalOpen = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal open={isOpen} onClose={close} onExit={unmount} ariaLabel="모임 이미지 수정">
        <ModifyClassImg img={img} id={id} onClose={close} />
      </Modal>
    ));
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
