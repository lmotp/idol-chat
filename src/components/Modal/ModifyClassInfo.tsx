import React, { memo, useEffect } from 'react';
import { useState } from 'react';
import { ButtonWrap, ModifyButton, ModifyInfoInput, ModifyInfoTextArea } from '@/design-system/styles/ModifyStyle';
import styled from '@emotion/styled';
import { ClassMemberCount, ClassMemberCountWrap } from '@/design-system/styles/FormStyle';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { apiClient } from '@/app/apiClient';
import useAppStore from '@/stores/useAppStore';
import type { ChangeEvent } from 'react';

const ModifyClassModalContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 33px 0;
`;

const ModifyInfoSubTitleWrap = styled.div`
  margin-top: 24px;
`;

const ModifyClassInfo = ({
  onClose,
  title,
  classTarget,
  id,
}: {
  onClose?: () => void;
  title?: string;
  classTarget?: string;
  id?: string;
}) => {
  const [classTargetValue, setClassTargetValue] = useState(classTarget);
  const [titleValue, setTitleValue] = useState(title);
  const toggleClassJoin = useAppStore((state) => state.toggleClassJoin);

  useEffect(() => {
    setTitleValue(title);
    setClassTargetValue(classTarget);
  }, [title, classTarget]);

  const ModalClose = () => {
    setTitleValue(title);
    setClassTargetValue(classTarget);
    onClose?.();
  };

  const ModifyFunc = () => {
    toggleClassJoin();
    apiClient
      .post<void>('/api/class/info/admin/modify', { id, className: titleValue, classTarget: classTargetValue })
      .then(() => {
        ModalClose();
        toggleClassJoin();
      });
  };

  return (
    <>
      <ModifyClassModalContainer>
        <ModifyInfoInput
          value={titleValue || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleValue(e.target.value)}
          type="text"
          placeholder="모임 이름"
        />

        <ModifyInfoSubTitleWrap>
          <ModifyInfoTextArea
            value={classTargetValue || ''}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setClassTargetValue(e.target.value)}
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

export default memo(ModifyClassInfo);
