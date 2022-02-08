import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyCategoryWrap = styled.div`
  width: 116px;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
`;

const MyCategoryButton = styled.div`
  margin-bottom: 10px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${(props) => (props.src ? 'url(' + props.src + ')' : 'white')} center no-repeat;
  background-size: cover;
  border: 1px dashed rgb(180, 180, 180);
  border-style: ${(props) => (props.src ? 'solid' : 'dashed')};
  background-size: cover;
`;

const MyCategoryClassName = styled.div`
  width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
`;

const MyCategoryWrapBox = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyCategory = ({ v }) => {
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
    <>
      <MyCategoryWrap onMouseDown={mouseDownFunc} onMouseUp={mouseUpFunc}>
        <Link to={`/pages/class/${v._id}`}>
          <MyCategoryWrapBox>
            <MyCategoryButton src={v.thumnail} />
            <MyCategoryClassName>{v.className}</MyCategoryClassName>
          </MyCategoryWrapBox>
        </Link>
      </MyCategoryWrap>
    </>
  );
};

export default MyCategory;
