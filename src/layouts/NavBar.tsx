import React from 'react';
import styled from '@emotion/styled';
import { FaHome, FaRegCommentAlt } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { IoIosMore } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NavBarConatiner = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(100%, 768px);
  height: 60px;
  display: flex;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(20px);
`;

const NavTest = styled(NavLink)`
  display: block;
  width: 25%;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  height: inherit;
  transition: color ${({ theme }) => theme.motion.base}, background-color ${({ theme }) => theme.motion.base};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};

  &[aria-current] {
    background: linear-gradient(180deg, ${({ theme }) => theme.colors.primarySoft}, #ffffff);
    color: ${({ theme }) => theme.colors.primary};
  }

  &:not([aria-current]):hover {
    background-color: ${({ theme }) => theme.colors.backgroundSoft};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavText = styled.div`
  font-size: 12px;
  margin-top: 2px;
`;

const NavIconWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  flex-direction: column;
`;

const NavBar = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!pathname.includes('/chat') && (
        <NavBarConatiner>
          <NavTest to="/pages/home">
            <NavIconWrap>
              <FaHome size="24px" />
              <NavText>메인</NavText>
            </NavIconWrap>
          </NavTest>

          <NavTest to="/pages/search">
            <NavIconWrap>
              <BiSearch size="24px" />
              <NavText>검색</NavText>
            </NavIconWrap>
          </NavTest>

          <NavTest to="/pages/my-class">
            <NavIconWrap>
              <FaRegCommentAlt size="20px" />
              <NavText>모임</NavText>
            </NavIconWrap>
          </NavTest>

          <NavTest to="/pages/see-more">
            <NavIconWrap>
              <IoIosMore size="24px" />
              <NavText>더보기</NavText>
            </NavIconWrap>
          </NavTest>
        </NavBarConatiner>
      )}
    </>
  );
};

export default NavBar;
