import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyCategoryWrap = styled.div`
  width: 140px;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyCategoryButton = styled.div`
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url(${(props) => props.image}) center no-repeat;
  background-size: cover;
`;

const MyCategoryClassName = styled.div`
  font-size: 14px;
`;

const MyCategoryWrapBox = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyCategory = ({ v, i }) => {
  return (
    <MyCategoryWrap>
      <Link to="/">
        <MyCategoryWrapBox>
          <MyCategoryButton image={v.thumnail} />
          <MyCategoryClassName>{v.className}</MyCategoryClassName>
        </MyCategoryWrapBox>
      </Link>
    </MyCategoryWrap>
  );
};

export default MyCategory;
