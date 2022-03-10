import React, { useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { IoIosMore } from 'react-icons/io';
import SettingModal from './Modal/SettingModal';
import { useDispatch, useSelector } from 'react-redux';
import { SelectCategoryText, SelectCategoryTextBox } from '../css/SelectBoxStyle';
import { mainCategoryChange } from '../modules/actions/UserCategoryActions';
import { useLocation } from 'react-router-dom';

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

const SelectCategory = ({ pagesHandler }) => {
  const [modalState, setModalState] = useState(false);
  const { category, _id } = useSelector((state) => state.userCheckReducers?.result);
  const selectCategory = useSelector((state) => state.userCategoryReducer);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(mainCategoryChange('전체'));
  }, [pathname, dispatch]);

  const settingModalOpen = () => {
    setModalState(!modalState);
  };

  return (
    <>
      {category ? (
        <SelectCategoryContainer>
          <SelectCategoryTextBox>
            {category.map((v, i) => (
              <SelectCategoryText
                select={v === selectCategory}
                onClick={() => {
                  dispatch(mainCategoryChange(v));
                  if (pagesHandler) {
                    pagesHandler();
                  }
                }}
                key={i}
              >
                {v}
              </SelectCategoryText>
            ))}
          </SelectCategoryTextBox>

          <IoIosMore style={{ cursor: 'pointer' }} size="24px" onClick={settingModalOpen} />
          {modalState && <SettingModal category={category} setModalState={setModalState} userId={_id} />}
        </SelectCategoryContainer>
      ) : null}
    </>
  );
};

export default memo(SelectCategory);
