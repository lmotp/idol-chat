import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosMore } from 'react-icons/io';
import SettingModal from './Modal/SettingModal';
import { useDispatch, useSelector } from 'react-redux';
import { mainCategoryRemove } from '../modules/actions/UserCategoryActions';

const SelectCategoryContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 24px auto;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const SelectCategoryText = styled.span`
  margin-right: 12px;
  background: #db7093;
  cursor: pointer;
  padding: 6px;
  border-radius: 3px;

  &:last-child {
    margin-right: 0;
  }
`;

const SelectCategoryTextBox = styled.div`
  color: white;
`;

const SelectCategory = () => {
  const [modalState, setModalState] = useState(false);
  const testTag = useSelector((state) => state.userCategoryReducer);
  const dispatch = useDispatch();

  const settingModalOpen = () => {
    setModalState(!modalState);
  };

  const removeCategory = (value) => {
    dispatch(mainCategoryRemove(value));
  };

  return (
    <SelectCategoryContainer>
      <SelectCategoryTextBox>
        {testTag.map((v, i) => (
          <SelectCategoryText onClick={() => removeCategory(v)} key={i}>
            {v}
          </SelectCategoryText>
        ))}
      </SelectCategoryTextBox>
      <IoIosMore style={{ cursor: 'pointer' }} size="24px" onClick={settingModalOpen} />
      {modalState && <SettingModal testTag={testTag} />}
    </SelectCategoryContainer>
  );
};

export default SelectCategory;
