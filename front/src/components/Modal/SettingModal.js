import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { ButtonWrap, ModifyButton } from '../../css/ModifyStyle';
import { userCheckActions } from '../../modules/actions/UserActions';

const SettingModalConatiner = styled.div`
  width: 30%;
  background: white;
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

const SettingModalBox = styled.div`
  width: 100%;
  background: white;
  padding: 10px;
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
  justify-content: space-around;
  text-align: center;
`;

const CategoryList = styled.li`
  width: 40%;
  margin: 4px 0;
  cursor: pointer;
  padding: 4px;

  &:nth-child(n + 9) {
    margin: 0;
  }

  ${(props) =>
    props.select &&
    css`
      background: #db7093;
      color: white;
    `}
`;

const SettingModal = ({ modalState, category, setModalState, userId }) => {
  const mainCategory = useSelector((state) => state.mainCategoryReducer);
  const [selectCategry, setSelectCategory] = useState([...category]);
  const dispatch = useDispatch();

  const selectCategoryFunc = (select) => {
    if (selectCategry.includes(select)) {
      const filter = selectCategry.filter((v) => v !== select);
      setSelectCategory(filter);
      return;
    } else {
      setSelectCategory([...selectCategry, select]);
    }
  };
  const modifyCategoryFunc = () => {
    axios.post('/api/auth/category/modify', { selectCategry, userId }).then((data) => {
      dispatch(userCheckActions());
    });
    setModalState(false);
  };

  return (
    <SettingModalConatiner>
      <SettingModalBox modalState={modalState}>
        <SettingModalTitle>관심사 추가</SettingModalTitle>
        <SettingModalCategory>
          {mainCategory.map((v, i) => {
            return (
              <CategoryList
                onClick={() => selectCategoryFunc(v.category)}
                select={selectCategry.includes(v.category)}
                key={i}
              >
                {v.category}
              </CategoryList>
            );
          })}
        </SettingModalCategory>
      </SettingModalBox>
      <ButtonWrap>
        <ModifyButton onClick={modifyCategoryFunc}>실행</ModifyButton>
        <ModifyButton
          onClick={() => {
            setModalState(false);
          }}
        >
          취소
        </ModifyButton>
      </ButtonWrap>
    </SettingModalConatiner>
  );
};

export default SettingModal;
