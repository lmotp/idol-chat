import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

const CircleButtonContainer = styled.button`
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(64 120 247);
  left: 3%;
  bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.3);
`;

const CircleButton = ({ value }) => {
  const { pathname } = useLocation();
  const circleRef = useRef();

  useEffect(() => {
    window.addEventListener('resize', function () {
      const circle = circleRef.current.getBoundingClientRect();

      console.log(circleRef.current?.style);
    });
  }, []);

  return (
    <Link to="/pages/class/make">
      <CircleButtonContainer ref={circleRef}>
        <AiOutlinePlus size="16px" style={{ marginBottom: '2px' }} />
        {value}
      </CircleButtonContainer>
    </Link>
  );
};

export default CircleButton;
