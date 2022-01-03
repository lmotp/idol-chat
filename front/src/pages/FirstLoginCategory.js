import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BackBar from '../components/BackBar';

import CategoryImg from '../components/FirstCategory/CategoryImg';

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

const FirstLoginCategory = () => {
  const category = useSelector((state) => state.mainCategoryReducer);
  const [clickCategory, setClickCategory] = useState([]);
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
      <BackBar title="관심사 선택" nextTitle="선택" clickCategory={clickCategory} page="/pages/home" />
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
    </FirstLoginContainer>
  );
};

export default FirstLoginCategory;
