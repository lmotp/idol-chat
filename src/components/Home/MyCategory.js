import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyCategoryWrapBox = styled.div`
  width: 130px;
  position: relative;
  display: inline-flex;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
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
  cursor: pointer;
`;

const MyCategoryClassName = styled.div`
  width: 90px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
`;

const MyCateogryCount = styled.div`
  position: absolute;
  left: 16px;
  top: 10px;
  background: #db7093;
  width: 21px;
  border-radius: 50%;
  height: 21px;
  line-height: 21px;
  color: white;
`;

const MyCategory = ({ v }) => {
  const naviagte = useNavigate();
  const [count, setCount] = useState(0);
  const { loginTime } = useSelector((state) => state.userCheckReducers.result);

  useEffect(() => {
    const date = localStorage.getItem(`chat-${v._id}`) || loginTime;
    axios.get(`/api/chat/${v._id}/unreads/${date}`).then(({ data: { count } }) => {
      setCount(count);
    });
  }, [v._id, loginTime]);

  return (
    <>
      <MyCategoryWrapBox>
        <MyCategoryButton
          src={v.thumnail}
          onClick={() => {
            naviagte(`/pages/class/${v._id}`);
          }}
        />
        <MyCategoryClassName
          onClick={() => {
            naviagte(`/pages/class/${v._id}`);
          }}
        >
          {v.className}
        </MyCategoryClassName>
        <MyCateogryCount>{count}</MyCateogryCount>
      </MyCategoryWrapBox>
    </>
  );
};

export default memo(MyCategory);
