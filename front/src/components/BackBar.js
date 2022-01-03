import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BarContainer = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  box-shadow: rgb(196 196 196 / 25%) 0px 2px 3px;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
`;

const BarWrap = styled.div``;

const BarTitle = styled.span`
  margin-right: 10px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

const BackBar = ({ title, nextTitle, clickCategory, page }) => {
  const navigate = useNavigate();

  return (
    <BarContainer>
      <BarWrap onClick={() => navigate(-1)}>
        <BarTitle>◀</BarTitle>
        <BarTitle>{title}</BarTitle>
      </BarWrap>

      {clickCategory?.length > 0 && <BarTitle onClick={() => navigate(page)}>{nextTitle}</BarTitle>}
    </BarContainer>
  );
};

export default BackBar;
