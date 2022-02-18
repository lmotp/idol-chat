import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ClassList from '../components/ClassList';
import MyCategory from '../components/Home/MyCategory';
import SelectCategory from '../components/SelectCategory';
import { useSelector } from 'react-redux';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { motion } from 'framer-motion';

const HomeContainer = styled.div``;

const MyCategroyBox = styled.div`
  width: 100%;
  height: 160px;
  border-bottom: 1px solid rgb(200, 200, 200);
  overflow: hidden;
`;

const MyCategoryWrap = styled(motion.div)`
  width: 100%;
  height: inherit;
  white-space: nowrap;
  cursor: grab;
`;

const HomeClassListBox = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const MyCategoryNone = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 160px;
`;

const ClassListWrap = styled.div`
  height: 75vh;
  padding-bottom: 90px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const ClassListNothing = styled.div`
  width: 100%;
  height: 70vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  font-weight: bold;
  flex-direction: column;
`;

const Home = () => {
  const { _id } = useSelector((state) => state.userCheckReducers.result);
  const selectCategory = useSelector((state) => state.userCategoryReducer);
  const [classList, setClassList] = useState([]);
  const [myClassList, setMyClassList] = useState([]);
  const [width, setWidth] = useState(0);
  const [pages, setPages] = useState(0);
  const [hasData, setHasData] = useState(true);
  const carouselRef = useRef();
  const classListRef = useRef();

  useEffect(() => {
    axios.post(`/api/class/list`, { selectCategory, pages }).then(({ data }) => {
      setClassList((prevItems) => {
        return [...prevItems, ...data];
      });
      setHasData(data.length > 0);
    });
  }, [selectCategory, _id, pages]);

  useEffect(() => {
    axios.get(`/api/class/list/my/${_id}`).then(({ data }) => {
      setMyClassList(data);
    });
  }, [_id]);

  useEffect(() => {
    if (myClassList.length) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [myClassList]);

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
    const scrollClassList = classListRef.current;
    scrollClassList.addEventListener('scroll', handleScroll);
    return () => {
      scrollClassList.removeEventListener('scroll', handleScroll);
    };
  });

  const pagesHandler = useCallback(() => {
    setPages(0);
    setClassList([]);
  }, [setPages]);

  return (
    <HomeContainer>
      <MyCategroyBox>
        {myClassList.length ? (
          <MyCategoryWrap ref={carouselRef} drag="x" dragConstraints={{ right: 0, left: -width }}>
            {myClassList.map((v, i) => {
              return <MyCategory v={v} key={i} />;
            })}
          </MyCategoryWrap>
        ) : (
          <MyCategoryNone>
            지금 모임에 가입해보세요
            <BsPlusCircleDotted style={{ marginLeft: '6px' }} />
          </MyCategoryNone>
        )}
      </MyCategroyBox>

      <HomeClassListBox>
        <SelectCategory pagesHandler={pagesHandler} />
        <ClassListWrap ref={classListRef}>
          {classList.length > 0 ? (
            <>
              {classList.map((v) => {
                return <ClassList v={v} key={v._id} on={myClassList.map((v) => v.className).includes(v.className)} />;
              })}
            </>
          ) : (
            <ClassListNothing>해당 검색어의 모임이 없습니다.</ClassListNothing>
          )}
        </ClassListWrap>
      </HomeClassListBox>
    </HomeContainer>
  );
};

export default Home;
