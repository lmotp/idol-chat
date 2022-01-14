import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

const CircleButtonContainer = styled.div`
  margin: 0px auto;
  width: 100%;
  height: 20px;
  max-width: 768px;
  position: fixed;
  bottom: 105px;
  z-index: 2;
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
`;

const CircleButton = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  return (
    <>
      {pathname === '/pages/home' || pathname === '/pages/my-class' || pathname === `/pages/class/${id}` ? (
        <Link to={id ? `/pages/class/${id}/chat` : '/pages/class/make'}>
          <CircleButtonContainer>
            <CircleButtonWrap>
              <AiOutlinePlus size="16px" style={{ marginBottom: '2px' }} />
              {id ? '채팅' : '개설'}
            </CircleButtonWrap>
          </CircleButtonContainer>
        </Link>
      ) : null}
    </>
  );
};

export default CircleButton;
