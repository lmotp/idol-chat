import React from 'react';
import styled from 'styled-components';

const ClassMainImgWrap = styled.div`
  width: 100%;
  height: 30vh;
  background: url(${(props) => props.src}) center no-repeat;
  background-size: cover;
`;

const ClassMainImg = ({ img }) => {
  return <ClassMainImgWrap src={img}></ClassMainImgWrap>;
};

export default ClassMainImg;
