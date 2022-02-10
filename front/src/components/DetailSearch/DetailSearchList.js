import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsEmojiNeutralFill, BsPlusCircleDotted } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthButton } from '../../css/FormStyle';
import ClassList from '../ClassList';

const DetailSearchListContainer = styled.div`
  margin-top: 24px;
`;
const DetailLocation = styled.h2`
  margin-bottom: 12px;
`;

const ClassListNothing = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? '70vh' : '74vh')};
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  font-weight: bold;
  flex-direction: column;
`;

const PlusButton = styled.div`
  display: flex;
  margin-right: 4px;
`;

const ClassListWrap = styled.div`
  height: 71vh;
  padding-bottom: 90px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const DetailSearchList = ({ category }) => {
  const { location } = useSelector((state) => state.userCheckReducers.result);
  const [classList, setClassList] = useState([]);
  const [mainLocation, setMainLocation] = useState('');
  const useSearchCategory = useLocation().state?.searchCategory;
  const example = useLocation().state?.example;
  const navigate = useNavigate();

  console.log(example);

  useEffect(() => {
    if (!useSearchCategory) {
      axios.post(`/api/class/list`, { selectCategory: category }).then(({ data }) => {
        setClassList(data);
      });
    } else {
      axios.post(`/api/class/list`, { useSearchCategory }).then(({ data }) => {
        setClassList(data);
      });
    }
  }, [category, useSearchCategory]);

  useEffect(() => {
    const locationArray = location.split(' ');
    setMainLocation(locationArray[1]);
  }, [location]);

  console.log(example);

  return (
    <DetailSearchListContainer>
      {classList.length > 0 ? (
        <>
          <DetailLocation>{mainLocation}</DetailLocation>
          <ClassListWrap>
            {classList.map((v, i) => {
              return <ClassList on="true" v={v} key={i} />;
            })}
          </ClassListWrap>
        </>
      ) : (
        <ClassListNothing height={example !== null}>
          해당 검색어의 모임이 없습니다.
          <AuthButton color="rgb(180,180,180)" onClick={() => navigate('/pages/class/make')}>
            <PlusButton>
              <BsPlusCircleDotted />
            </PlusButton>
            정모 만들기
          </AuthButton>
        </ClassListNothing>
      )}
    </DetailSearchListContainer>
  );
};

export default DetailSearchList;
