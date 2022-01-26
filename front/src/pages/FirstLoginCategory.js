import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BackBar from '../components/BackBar';

import CategoryImg from '../components/FirstCategory/CategoryImg';
import Modal from '../components/Modal/Modal';
import { ModifyButton } from '../css/ModifyStyle';

const FirstLoginContainer = styled.div`
  width: 100%;
`;

const CategoryListWrap = styled.ul`
  width: 90%;
  height: 93.4vh;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
`;

const CategoryList = styled.li`
  width: 33%;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryListValue = styled.div`
  margin-top: 10px;
`;

const AlertModal = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AlertModalValue = styled.p`
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 18px;
`;

const FirstLoginCategory = () => {
  const category = useSelector((state) => state.mainCategoryReducer);
  const { _id } = useSelector((state) => state.userCheckReducers.result);

  const [clickCategory, setClickCategory] = useState([]);
  const [modalState, setModalState] = useState(false);

  const ModalClose = () => {
    setModalState(false);
  };

  const selectCategoryFunc = (setClickState, clickState, categoryValue) => {
    setClickState(!clickState);
    if (!clickState) {
      setClickCategory([...clickCategory, categoryValue]);
    } else {
      const popCategory = clickCategory.filter((v) => v !== categoryValue);
      setClickCategory(popCategory);
    }
  };

  return (
    <FirstLoginContainer>
      <BackBar title="관심사 선택" nextTitle="선택" clickCategory={clickCategory} page="/pages/home" _id={_id} />
      <CategoryListWrap>
        {category.map((v, i) => {
          return (
            <CategoryList key={i}>
              <CategoryImg v={v} selectCategoryFunc={selectCategoryFunc} />
              <CategoryListValue>{v.category}</CategoryListValue>
            </CategoryList>
          );
        })}
      </CategoryListWrap>
      <Modal modalState={modalState}>
        <AlertModal>
          <AlertModalValue>카테고리는 최대 3개까지만 가능!</AlertModalValue>
          <ModifyButton pd="8px 32px" onClick={ModalClose}>
            취소
          </ModifyButton>
        </AlertModal>
      </Modal>
    </FirstLoginContainer>
  );
};

export default FirstLoginCategory;
