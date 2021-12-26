import React from 'react';
import styled from 'styled-components';
import { FaHome, FaRegCommentAlt } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { IoIosMore } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

const NavBarConatiner = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 768px;
  height: 60px;
  display: flex;
  justify-content: center;
`;

const NavButton = styled.button`
  width: 25%;
  height: inherit;
`;

const NavText = styled.div`
  font-size: 12px;
`;

const NavIconWrap = styled.div`
  width: 100%;
`;

const NavBar = () => {
  return (
    <NavBarConatiner>
      <NavButton>
        <NavLink to="/pages/home" style={({ isActive }) => ({ color: isActive ? '#db7093' : 'black' })}>
          <NavIconWrap>
            <FaHome size="24px" />
            <NavText>메인</NavText>
          </NavIconWrap>
        </NavLink>
      </NavButton>

      <NavButton>
        <NavLink to="/pages/search" style={({ isActive }) => ({ color: isActive ? '#db7093' : 'black' })}>
          <NavIconWrap>
            <BiSearch size="24px" />
            <NavText>검색</NavText>
          </NavIconWrap>
        </NavLink>
      </NavButton>

      <NavButton>
        <NavLink to="/pages/my-class" style={({ isActive }) => ({ color: isActive ? '#db7093' : 'black' })}>
          <NavIconWrap>
            <FaRegCommentAlt size="20px" />
            <NavText>모임</NavText>
          </NavIconWrap>
        </NavLink>
      </NavButton>

      <NavButton>
        <NavLink to="/pages/see-more" style={({ isActive }) => ({ color: isActive ? '#db7093' : 'black' })}>
          <NavIconWrap>
            <IoIosMore size="24px" />
            <NavText>더보기</NavText>
          </NavIconWrap>
        </NavLink>
      </NavButton>
    </NavBarConatiner>
  );
};

export default NavBar;
