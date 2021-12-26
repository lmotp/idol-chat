import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyCategoryWrap = styled.div`
  width: 140px;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

const MyCategoryButton = styled.div`
  margin-bottom: 10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: url(${(props) => props.image}) center no-repeat;
  background-size: cover;
`;

const MyCategoryClassName = styled.div`
  font-size: 12px;
`;

const MyCategoryWrapBox = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyCategory = ({ v, i }) => {
  const startPostionRef = useRef(0);
  const stopPostionRef = useRef(0);

  const [moveValue, setMoveValue] = useState(0);
  const mouseDownFunc = (e) => {
    startPostionRef.current = e.clientX;
    console.log('나 눌렸어');
  };

  const mouseUpFunc = (e) => {
    stopPostionRef.current = e.clientX;
    console.log('나는 뗏어');
  };

  if (startPostionRef.current - stopPostionRef.current > 0) {
    console.log('hi');
  }

  return (
    <MyCategoryWrap onMouseDown={mouseDownFunc} onMouseUp={mouseUpFunc}>
      <Link to="/">
        <MyCategoryWrapBox>
          <MyCategoryButton image={v.thumnail} />
          <MyCategoryClassName>{v.className}</MyCategoryClassName>
        </MyCategoryWrapBox>
      </Link>
    </MyCategoryWrap>
  );
};

export default MyCategory;
