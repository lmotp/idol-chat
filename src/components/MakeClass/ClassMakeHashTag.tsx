import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import styled from '@emotion/styled';
import { ModifyInfoInput } from '@/design-system/styles/ModifyStyle';
import type { Dispatch, SetStateAction } from 'react';

const ClassMakeHashTagContainer = styled.div`
  margin-top: 12px;
`;

const HashTagForm = styled.form`
  margin-bottom: 6px;
`;

const HashTagListBox = styled.ul`
  display: flex;
  height: 14px;
  padding: 0 8px;
`;

const HashTagList = styled.li`
  font-size: 13px;
  margin-right: 12px;
  color: rgb(100, 100, 100);
  display: flex;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
`;

const ClassMakeHashTag = ({
  hashTag,
  setHashTag,
}: {
  hashTag: string[];
  setHashTag: Dispatch<SetStateAction<string[]>>;
}) => {
  const [value, setValue] = useState('');

  const spaceControl = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (value === '' && e.code === 'Space') {
      e.preventDefault();
      return;
    } else if (e.code === 'Space' && hashTag.length < 5) {
      e.preventDefault();
      setHashTag((prev) => [...prev, value]);
      setValue('');
    }
  };

  const hashTagChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value && hashTag.length < 5) {
      setHashTag((prev) => [...prev, value]);
      setValue('');
    }
  };

  const cancelHashList = (index: number) => {
    setHashTag(hashTag.filter((v, i) => i !== index));
  };

  return (
    <ClassMakeHashTagContainer>
      <HashTagForm onSubmit={onSubmitHandler}>
        <ModifyInfoInput
          type="text"
          placeholder="#태그 입력 : 5자 이내 뛰어쓰기 시 해쉬태그 적용"
          value={value}
          onChange={hashTagChangeHanlder}
          onKeyPress={spaceControl}
          maxLength={5}
        />
      </HashTagForm>
      <HashTagListBox>
        {hashTag.map((v, i) => (
          <HashTagList key={i}>
            #{v}
            <AiFillCloseCircle cursor="pointer" style={{ marginLeft: '3px' }} onClick={() => cancelHashList(i)} />
          </HashTagList>
        ))}
      </HashTagListBox>
    </ClassMakeHashTagContainer>
  );
};

export default ClassMakeHashTag;
