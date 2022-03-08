import React, { useState } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';

const CategoryListLogo = styled.div`
  overflow: hidden;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  width: ${(props) => props.width || '120px'};
  height: ${(props) => props.height || '120px'};
  border-radius: 50%;
  cursor: pointer;
`;

const CategoryClickTag = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  width: 100%;
  height: inherit;
  display: ${(props) => (props.hover ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const CategoryImg = ({ v, selectCategoryFunc, width, height }) => {
  const [clickState, setClickState] = useState(false);

  return (
    <>
      <CategoryListLogo
        width={width}
        height={height}
        src={v.img}
        onClick={() => selectCategoryFunc(setClickState, clickState, v.category)}
      >
        <CategoryClickTag hover={clickState}>
          <BsCheckLg color="white" size="33px" />
        </CategoryClickTag>
      </CategoryListLogo>
    </>
  );
};

export default CategoryImg;
