import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
  height: 66vh;
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

const DetailSearchList = () => {
  const { location } = useSelector((state) => state.userCheckReducers.result);
  const [classList, setClassList] = useState([]);
  const [mainLocation, setMainLocation] = useState('');
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    axios.get(`/api/class/list/${category}`).then(({ data }) => {
      setClassList(data);
    });
  }, [category]);

  useEffect(() => {
    const locationArray = location.split(' ');
    setMainLocation(locationArray[0]);
  }, [location]);

  return (
    <DetailSearchListContainer>
      {classList.length > 0 ? (
        <>
          <DetailLocation>{mainLocation}</DetailLocation>
          {classList.map((v, i) => {
            return <ClassList on="true" v={v} key={i} />;
          })}
        </>
      ) : (
        <ClassListNothing>
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
