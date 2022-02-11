import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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
  position: relative;
`;

const MyCateogryCount = styled.div`
  position: absolute;
  left: 0px;
  top: 10px;
  background: #db7093;
  width: 21px;
  border-radius: 50%;
  height: 21px;
  line-height: 21px;
  color: white;
`;

const MyCategory = ({ v }) => {
  const startPostionRef = useRef(0);
  const stopPostionRef = useRef(0);
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    const date = localStorage.getItem(`chat-${v._id}`) || new Date();
    axios.get(`/api/chat/${v._id}/unreads/${date}`).then(({ data: { count } }) => {
      console.log(count);
      setCount(count);
    });
  }, [v._id]);

  return (
    <>
      <MyCategoryWrap onMouseDown={mouseDownFunc} onMouseUp={mouseUpFunc}>
        <Link to={`/pages/class/${v._id}`}>
          <MyCategoryWrapBox>
            <MyCategoryButton src={v.thumnail} />
            <MyCategoryClassName>{v.className}</MyCategoryClassName>
            <MyCateogryCount>{count}</MyCateogryCount>
          </MyCategoryWrapBox>
        </Link>
      </MyCategoryWrap>
    </>
  );
};

export default MyCategory;
