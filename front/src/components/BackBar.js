import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { menuToggle } from '../modules/actions/MemberListAction';
import axios from 'axios';
import useSocket from '../hooks/useSocket';

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

const BackBar = ({ title, classTitle, nextTitle, clickCategory, page, _id }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [socket, disconnect] = useSocket(id);

  const selectCategory = () => {
    axios.post('/api/auth/select-category', { clickCategory, _id }).then((data) => {
      console.log(data);
      navigate(page);
    });
  };

  const back = useCallback(() => {
    if (id) {
      console.log('안녕?');

      socket.emit('leaveRoom', id);
      socket.on('leave', (data) => {
        console.log('나 실행됭?', data);
      });
      disconnect();
      navigate(-1);
    }
  }, [id, socket, disconnect, navigate]);

  return (
    <BarContainer>
      <BarWrap onClick={back}>
        <BarTitle>◀</BarTitle>
        <BarTitle>{title}</BarTitle>
      </BarWrap>

      {clickCategory?.length > 0 && <BarTitle onClick={selectCategory}>{nextTitle}</BarTitle>}
      {pathname.includes('/chat') && (
        <GiHamburgerMenu size="24px" cursor="pointer" onClick={() => dispatch(menuToggle())} />
      )}
    </BarContainer>
  );
};

export default BackBar;
