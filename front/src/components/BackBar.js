import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { menuToggle } from '../modules/actions/MemberListAction';

const BarContainer = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  box-shadow: rgb(196 196 196 / 25%) 0px 2px 3px;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BarWrap = styled.div``;

const BarTitle = styled.span`
  margin-right: 18px;
  cursor: pointer;
`;
const BarClassTitle = styled.span``;

const BackBar = ({ title, classTitle, nextTitle, clickCategory, page }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  return (
    <BarContainer>
      <BarWrap onClick={() => navigate(-1)}>
        <BarTitle>◀</BarTitle>
        <BarTitle>{title}</BarTitle>
        {pathname.includes('/chat') && <BarClassTitle>" {classTitle} "</BarClassTitle>}
      </BarWrap>

      {clickCategory?.length > 0 && <BarTitle onClick={() => navigate(page)}>{nextTitle}</BarTitle>}
      {pathname.includes('/chat') && (
        <GiHamburgerMenu size="24px" cursor="pointer" onClick={() => dispatch(menuToggle())} />
      )}
    </BarContainer>
  );
};

export default BackBar;
