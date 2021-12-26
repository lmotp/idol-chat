import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const CategoryBox = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CategoryWrap = styled.li`
  width: 48%;
  padding: 10px 12px;
  margin-bottom: 24px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 6px;
  display: flex;
  align-items: center;
`;
const CategoryThumnail = styled.img.attrs((props) => ({
  src: props.src,
}))`
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const CategoryInfoBox = styled.div`
  margin-left: 20px;
  width: 100%;
`;

const Category = styled.h3`
  margin-bottom: 6px;
  cursor: pointer;
`;

const CategoryExample = styled.ul`
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Example = styled.li`
  margin-right: 6px;
  line-height: 1.5;
  color: rgb(180, 180, 180);
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const ClassCategorySelect = () => {
  const mainCategory = useSelector((state) => state.mainCategoryReducer);

  return (
    <CategoryBox>
      {mainCategory.map((v, i) => {
        return (
          <CategoryWrap>
            <CategoryThumnail src={v.img}></CategoryThumnail>
            <CategoryInfoBox>
              <Category key={i}>{v.category}</Category>
              <CategoryExample>
                {v.example.map((v) => {
                  return <Example>#{v}</Example>;
                })}
              </CategoryExample>
            </CategoryInfoBox>
          </CategoryWrap>
        );
      })}
    </CategoryBox>
  );
};

export default ClassCategorySelect;
