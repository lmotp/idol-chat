import React from 'react';
import { useState } from 'react';
import { ButtonWrap, ModifyButton, ModifyInfoInput, ModifyInfoTextArea } from '../../css/ModifyStyle';
import styled from 'styled-components';
import { AiOutlinePicture } from 'react-icons/ai';
import { useRef } from 'react';

const ModifyClassModalContainer = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const ModifyInfoSubTitleWrap = styled.div`
  margin: 16px 0;
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
  cursor: pointer;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  margin: 16px 0;
`;

const ModifyClassModal = ({ modalState, ModalClose, title, subTitle }) => {
  const [subTitleValue, setSubTitleValue] = useState(subTitle);
  const [titleValue, setTitleValue] = useState(title);
  const textAreaRef = useRef();

  const textResize = () => {
    const textArea = textAreaRef.current;
    if (textArea.style.height > '188px') {
      return;
    }

    textArea.style.height = '70px';
    textArea.style.height = `${textArea.scrollHeight}px`;
  };

  return (
    <>
      <ModifyClassModalContainer>
        <ModifyMainImgInput id="img" type="file" />
        <ModifyMainImgLabel htmlFor="img">
          <AiOutlinePicture size="33px" color="rgb(100,100,100)" style={{ marginBottom: '6px' }} />
          우리의 모임의 사진을 올려보세요
        </ModifyMainImgLabel>

        <ModifyInfoInput
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          type="text"
          placeholder="모임 이름"
        />

        <ModifyInfoSubTitleWrap>
          <ModifyInfoTextArea
            value={subTitleValue}
            onChange={(e) => setSubTitleValue(e.target.value)}
            type="text"
            placeholder="모임 폭표를 설명해주세요."
            ref={textAreaRef}
            onKeyDown={textResize}
            onKeyUp={textResize}
          />
        </ModifyInfoSubTitleWrap>
      </ModifyClassModalContainer>
      <ButtonWrap>
        <ModifyButton>실행</ModifyButton>
        <ModifyButton onClick={ModalClose}>취소</ModifyButton>
      </ButtonWrap>
    </>
  );
};

export default ModifyClassModal;
