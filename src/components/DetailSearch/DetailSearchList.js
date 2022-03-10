import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
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
  const [pages, setPages] = useState(0);
  const [hasData, setHasData] = useState(true);
  const useSearchCategory = useLocation().state?.searchCategory;
  const example = useLocation().state?.example;
  const navigate = useNavigate();
  const classListRef = useRef();

  const { pathname } = useLocation();
  useEffect(() => {
    setPages(0);
    setClassList([]);
  }, [pathname]);

  useEffect(() => {
    if (!useSearchCategory) {
      axios.post(`/api/class/list`, { selectCategory: category, pages }).then(({ data }) => {
        setClassList((prevItems) => {
          return [...prevItems, ...data];
        });
        setHasData(data.length > 0);
      });
    } else {
      axios.post(`/api/class/list`, { useSearchCategory, pages }).then(({ data }) => {
        if (data.length > 0) {
          setClassList((prevItems) => {
            return [...prevItems, ...data];
          });
        }
        setHasData(data.length > 0);
      });
    }
  }, [category, useSearchCategory, pages]);

  useEffect(() => {
    const locationArray = location.split(' ');
    setMainLocation(locationArray[1]);
  }, [location]);

  const handleScroll = () => {
    const scrollHeight = classListRef.current.scrollHeight;
    const scrollTop = classListRef.current.scrollTop;
    const clientHeight = classListRef.current.clientHeight;
    if (!hasData) {
      return;
    }
    if (scrollHeight === scrollTop + clientHeight) {
      setPages(pages + 1);
    }
  };

  useEffect(() => {
    if (classListRef.current) {
      const scrollClassList = classListRef.current;
      scrollClassList.addEventListener('scroll', handleScroll);
      return () => {
        scrollClassList.removeEventListener('scroll', handleScroll);
      };
    }
  });

  return (
    <DetailSearchListContainer>
      {classList.length > 0 ? (
        <>
          <DetailLocation>{mainLocation}</DetailLocation>
          <ClassListWrap ref={classListRef}>
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
