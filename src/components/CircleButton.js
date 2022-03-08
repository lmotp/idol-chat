import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';

const CircleButtonContainer = styled.div`
  margin: 0px auto;
  width: 100%;
  height: 20px;
  max-width: 768px;
  position: fixed;
  bottom: 105px;
  pointer-events: none;
`;
const CircleButtonWrap = styled.button`
  position: absolute;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: rgb(64 120 247);
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.3);
  pointer-events: auto;

  &:hover {
    background: red;
  }
`;

const CircleButton = () => {
  const [chatState, setChatState] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();
  const { _id } = useSelector((state) => state.userCheckReducers.result);
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === `/pages/class/${id}`) {
      axios.get(`/api/class/info/${id}`).then(({ data }) => {
        setChatState(data[0].member.includes(_id));
      });
    }
  }, [pathname, id, _id]);

  return (
    <>
      {pathname === '/pages/home' ||
      pathname === '/pages/my-class' ||
      (pathname === `/pages/class/${id}` && chatState) ? (
        <CircleButtonContainer>
          <CircleButtonWrap onClick={() => navigate(id ? `/pages/class/${id}/chat` : '/pages/class/make')}>
            <AiOutlinePlus size="16px" style={{ marginBottom: '2px' }} />
            {id ? '채팅' : '개설'}
          </CircleButtonWrap>
        </CircleButtonContainer>
      ) : null}
    </>
  );
};

export default CircleButton;
