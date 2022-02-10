import React, { memo, useEffect } from 'react';
import { useState } from 'react';
import { ButtonWrap, ModifyButton } from '../../css/ModifyStyle';
import styled from 'styled-components';
import { AiOutlinePicture } from 'react-icons/ai';
import axios from 'axios';

const ModifyClassModalContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
`;

const ModifyMainImgInput = styled.input`
  display: none;
`;
const ModifyMainImgLabel = styled.label`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  margin-bottom: 16px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  position: relative;
  cursor: pointer;
  overflow: hidden;

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

const ModifyMaingValue = styled.h3`
  text-align: center;
`;

const ModifyClassImg = ({ setModalState, img, id, setReloadState }) => {
  const [mainImg, setMainImg] = useState(img);
  const [hoverState, setHoverState] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    setMainImg(img);
  }, [img]);

  const imgChange = (e) => {
    let theFile = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = (e) => {
      setMainImg(e.target.result);
      setFileName(theFile);
    };

    reader.readAsDataURL(theFile);
  };

  const ModalClose = () => {
    setMainImg(img);
    setModalState(false);
  };

  const ModifyFunc = () => {
    setReloadState(true);
    const formData = new FormData();
    formData.append('image', fileName ? fileName : mainImg);
    formData.append('id', id);

    axios.post('/api/class/info/admin/modify', formData).then(() => {
      ModalClose();
      setReloadState(false);
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
        <ModifyButton onClick={ModifyFunc}>수정</ModifyButton>
        <ModifyButton onClick={ModalClose}>취소</ModifyButton>
      </ButtonWrap>
    </>
  );
};

export default memo(ModifyClassImg);
