import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BarWrap = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  box-shadow: rgb(196 196 196 / 25%) 0px 2px 3px;
  padding: 20px 40px;
`;

const BarTitle = styled.span`
  margin-right: 10px;
  cursor: pointer;
`;

const BackBar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <BarWrap>
      <BarTitle onClick={() => navigate(-1)}>◀</BarTitle>
      {title}
    </BarWrap>
  );
};

export default BackBar;
