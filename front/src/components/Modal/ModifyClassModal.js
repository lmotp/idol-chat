import React from 'react';
import { useState } from 'react';
import { ButtonWrap, ModifyButton, ModifyInfoInput, ModifyInfoTextArea } from '../../css/ModifyStyle';
import styled from 'styled-components';
import { AiOutlinePicture } from 'react-icons/ai';
import { ClassMemberCount, ClassMemberCountWrap } from '../../css/FormStyle';
import { BsFillPersonPlusFill } from 'react-icons/bs';

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
  cursor: pointer;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  margin-bottom: 24px;
`;

const ModifyClassModal = ({ modalState, ModalClose, title, subTitle }) => {
  const [subTitleValue, setSubTitleValue] = useState(subTitle);
  const [titleValue, setTitleValue] = useState(title);

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
        <ModifyButton>수정</ModifyButton>
        <ModifyButton onClick={ModalClose}>취소</ModifyButton>
      </ButtonWrap>
    </>
  );
};

export default ModifyClassModal;
