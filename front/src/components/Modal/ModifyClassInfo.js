import React, { memo, useEffect } from 'react';
import { useState } from 'react';
import { ButtonWrap, ModifyButton, ModifyInfoInput, ModifyInfoTextArea } from '../../css/ModifyStyle';
import styled from 'styled-components';
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

const ModifyClassInfo = ({ setModalState, title, classTarget, id, setReloadState }) => {
  const [classTargetValue, setClassTargetValue] = useState(classTarget);
  const [titleValue, setTitleValue] = useState(title);

  useEffect(() => {
    setTitleValue(title);
    setClassTargetValue(classTarget);
  }, [title, classTarget]);

  const ModalClose = () => {
    setTitleValue(title);
    setClassTargetValue(classTarget);
    setModalState(false);
  };

  const ModifyFunc = () => {
    setReloadState(true);

    axios
      .post('/api/class/info/admin/modify', { id, className: titleValue, classTarget: classTargetValue })
      .then(() => {
        ModalClose();
        setReloadState(false);
      });
  };

  return (
    <>
      <ModifyClassModalContainer>
        <ModifyInfoInput
          value={titleValue || ''}
          onChange={(e) => setTitleValue(e.target.value)}
          type="text"
          placeholder="모임 이름"
        />

        <ModifyInfoSubTitleWrap>
          <ModifyInfoTextArea
            value={classTargetValue || ''}
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

export default memo(ModifyClassInfo);
