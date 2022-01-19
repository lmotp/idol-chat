import React, { useEffect } from 'react';
import { useState } from 'react';
import { ButtonWrap, ModifyButton, ModifyInfoInput, ModifyInfoTextArea } from '../../css/ModifyStyle';
import styled from 'styled-components';
import { AiOutlinePicture } from 'react-icons/ai';
import { ClassMemberCount, ClassMemberCountWrap } from '../../css/FormStyle';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import axios from 'axios';

const ModifyClassModalContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 33px 0;
`;

const ModifyInfoSubTitleWrap = styled.div`
  margin-top: 24px;
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
  margin-bottom: 24px;
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

const ModifyClassModal = ({ ModalClose, title, classTarget, img, id, setReloadState }) => {
  const [classTargetValue, setClassTargetValue] = useState(classTarget);
  const [titleValue, setTitleValue] = useState(title);
  const [hoverState, setHoverState] = useState(false);
  const [mainImg, setMainImg] = useState(img);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    setTitleValue(title);
    setClassTargetValue(classTarget);
    setMainImg(img);
  }, [title, classTarget, img]);

  const imgChange = (e) => {
    let theFile = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = (e) => {
      setMainImg(e.target.result);
      setFileName(theFile);
    };

    reader.readAsDataURL(theFile);
  };

  const ModifyFunc = () => {
    setReloadState(true);
    const formData = new FormData();
    formData.append('image', fileName ? fileName : mainImg);
    formData.append('title', titleValue);
    formData.append('classTarget', classTargetValue);
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

        <ModifyInfoInput
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          type="text"
          placeholder="모임 이름"
        />

        <ModifyInfoSubTitleWrap>
          <ModifyInfoTextArea
            value={classTargetValue}
            onChange={(e) => setClassTargetValue(e.target.value)}
            type="text"
            placeholder="모임 폭표를 설명해주세요."
            height="180px"
          />
        </ModifyInfoSubTitleWrap>
        <ClassMemberCountWrap>
          <ClassMemberCount>
            <BsFillPersonPlusFill size="18px" style={{ marginRight: '10px' }} />
            정원 (20 ~ 20명)
          </ClassMemberCount>
          <ModifyInfoInput al="center" width="10%" type="text" placeholder="20" />
        </ClassMemberCountWrap>
      </ModifyClassModalContainer>
      <ButtonWrap>
        <ModifyButton onClick={ModifyFunc}>수정</ModifyButton>
        <ModifyButton onClick={ModalClose}>취소</ModifyButton>
      </ButtonWrap>
    </>
  );
};

export default ModifyClassModal;
