import React, { memo, useEffect } from 'react';
import { useState } from 'react';
import { ButtonWrap, ModifyButton } from '@/design-system/styles/ModifyStyle';
import styled from '@emotion/styled';
import { AiOutlinePicture } from 'react-icons/ai';
import { apiClient } from '@/app/apiClient';
import useAppStore from '@/stores/useAppStore';
import type { ChangeEvent } from 'react';
import type { HoverProp, SrcProp } from '@/types/ui/styled-props';

const ModifyClassModalContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
`;

const ModifyMainImgInput = styled.input`
  display: none;
`;
const ModifyMainImgLabel = styled.label<SrcProp & HoverProp>`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  margin-bottom: 16px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  position: relative;
  cursor: pointer;
  overflow: hidden;

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

const ModifyMaingValue = styled.h3`
  text-align: center;
`;

const ModifyClassImg = ({ onClose, img, id }: { onClose?: () => void; img?: string; id?: string }) => {
  const [mainImg, setMainImg] = useState(img);
  const [hoverState, setHoverState] = useState(false);
  const [fileName, setFileName] = useState<File | string>('');
  const toggleClassJoin = useAppStore((state) => state.toggleClassJoin);

  useEffect(() => {
    setMainImg(img);
  }, [img]);

  const imgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const theFile = e.target.files?.[0];
    if (!theFile) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = (loadEvent) => {
      setMainImg(loadEvent.target?.result as string);
      setFileName(theFile);
    };

    reader.readAsDataURL(theFile);
  };

  const ModalClose = () => {
    setMainImg(img);
    onClose?.();
  };

  const ModifyFunc = () => {
    toggleClassJoin();
    const formData = new FormData();
    formData.append('image', fileName instanceof File ? fileName : mainImg ?? '');
    formData.append('id', id ?? '');

    apiClient.post<void>('/api/class/info/admin/modify', formData).then(() => {
      ModalClose();
      toggleClassJoin();
    });
  };

  return (
    <>
      <ModifyClassModalContainer>
        <ModifyMainImgInput id="img" type="file" onChange={imgChange} accept="image/*" />
        <ModifyMainImgLabel
          htmlFor="img"
          src={mainImg}
          hover={hoverState}
          onMouseEnter={() => {
            setHoverState(true);
          }}
          onMouseLeave={() => {
            setHoverState(false);
          }}
        >
          {!mainImg && (
            <>
              <AiOutlinePicture size="33px" color="rgb(100,100,100)" style={{ marginBottom: '6px' }} />
              우리의 모임의 사진을 올려보세요
            </>
          )}
        </ModifyMainImgLabel>
        <ModifyMaingValue>모임에 원하시는 사진으로 변경해보세요!</ModifyMaingValue>
      </ModifyClassModalContainer>
      <ButtonWrap>
        <ModifyButton type="button" onClick={ModifyFunc}>
          수정
        </ModifyButton>
        <ModifyButton type="button" onClick={ModalClose}>
          취소
        </ModifyButton>
      </ButtonWrap>
    </>
  );
};

export default memo(ModifyClassImg);
