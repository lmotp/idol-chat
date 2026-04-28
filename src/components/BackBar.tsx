import React, { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from '@emotion/styled';
import axios from 'axios';
import useSocket from '@/hooks/useSocket';
import useAppStore from '@/stores/useAppStore';
type BackBarProps = {
  title: string;
  nextTitle?: string;
  clickCategory?: string[];
  page?: string;
  _id?: string;
};

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

const BarWrap = styled.div`
  display: flex;
  align-items: center;
`;

const BarTitle = styled.span`
  margin-right: 18px;
  cursor: pointer;
`;

const BackBar = ({ title, nextTitle, clickCategory, page, _id }: BackBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [socket, disconnect] = useSocket(id);
  const toggleChatMember = useAppStore((state) => state.toggleChatMember);

  const selectCategory = () => {
    if (!page) {
      return;
    }

    axios.post('/api/auth/select-category', { clickCategory, _id }).then((data) => {
      navigate(page);
    });
  };

  const back = useCallback(() => {
    if (id && pathname.includes('/chat') && socket) {
      localStorage.setItem(`chat-${id}`, new Date().getTime().toString());
      socket.emit('leaveRoom', id);
      socket.on('leave', (data) => {});
      disconnect();
      navigate(-1);
    } else {
      navigate(-1);
    }
  }, [id, socket, disconnect, navigate, pathname]);

  return (
    <BarContainer>
      <BarWrap onClick={back}>
        <BarTitle>◀</BarTitle>
        <BarTitle>{title}</BarTitle>
      </BarWrap>

      {((clickCategory?.length ?? 0) > 0) && nextTitle && <BarTitle onClick={selectCategory}>{nextTitle}</BarTitle>}
      {pathname.includes('/chat') && (
        <GiHamburgerMenu size="24px" cursor="pointer" onClick={toggleChatMember} />
      )}
    </BarContainer>
  );
};

export default BackBar;
