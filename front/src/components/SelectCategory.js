import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosMore } from 'react-icons/io';
import SettingModal from './Modal/SettingModal';
import { useSelector } from 'react-redux';
import { SelectCategoryText, SelectCategoryTextBox } from '../css/SelectBoxStyle';

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

const SelectCategory = () => {
  const [modalState, setModalState] = useState(false);
  const { category } = useSelector((state) => state.userCheckReducers?.result);

  const settingModalOpen = () => {
    setModalState(!modalState);
  };

  return (
    <SelectCategoryContainer>
      <SelectCategoryTextBox>
        {category.map((v, i) => (
          <SelectCategoryText key={i}>{v}</SelectCategoryText>
        ))}
      </SelectCategoryTextBox>
      <IoIosMore style={{ cursor: 'pointer' }} size="24px" onClick={settingModalOpen} />
      {modalState && <SettingModal testTag={category} />}
    </SelectCategoryContainer>
  );
};

export default SelectCategory;
