import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { mainCategoryAdd } from '../../modules/actions/UserCategoryActions';

const SettingModalBox = styled.div`
  width: 30%;
  background: white;
  padding: 10px;
  border: 1px solid rgb(200, 200, 200);
  position: absolute;
  right: 3%;
  top: 82%;
  z-index: 9999;

  ${(props) =>
    props.modalState &&
    css`
      display: block;
      align-items: center;
    `}
`;

const SettingModalTitle = styled.div`
  border-bottom: 1px solid rgb(200, 200, 200);
  margin-bottom: 10px;
  padding-bottom: 5px;
  font-size: 16px;
`;

const SettingModalCategory = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const CategoryList = styled.li`
  width: 40%;
  margin-bottom: 4px;
  margin-right: 10%;
  cursor: pointer;
  padding: 4px;

  &:nth-child(n + 9) {
    margin-bottom: 0;
  }

  ${(props) =>
    props.select &&
    css`
      background: #db7093;
      color: white;
    `}
`;

const SettingModal = ({ modalState, testTag }) => {
  const mainCategory = useSelector((state) => state.mainCategoryReducer);
  const dispatch = useDispatch();

  const addCategory = (value) => {
    dispatch(mainCategoryAdd(value));
  };

  return (
    <SettingModalBox modalState={modalState}>
      <SettingModalTitle>관심사 추가</SettingModalTitle>
      <SettingModalCategory>
        {mainCategory.map((v, i) => {
          return (
            <CategoryList onClick={() => addCategory(v.category)} select={testTag.includes(v.category)} key={i}>
              {v.category}
            </CategoryList>
          );
        })}
      </SettingModalCategory>
    </SettingModalBox>
  );
};

export default SettingModal;
