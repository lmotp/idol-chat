import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { ModifyInfoInput } from '../../css/ModifyStyle';

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

const ClassMakeHashTag = ({ hashTag, setHashTag }) => {
  const [value, setValue] = useState('');

  const spaceControl = (e) => {
    if (value === '' && e.code === 'Space') {
      e.preventDefault();
      return;
    } else if (e.code === 'Space' && hashTag.length < 5) {
      e.preventDefault();
      setHashTag((prev) => [...prev, value]);
      setValue('');
    }
  };

  const hashTagChangeHanlder = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (value && hashTag.length < 5) {
      setHashTag((prev) => [...prev, value]);
      setValue('');
    }
  };

  const cancelHashList = (index) => {
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
          maxLength="5"
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
