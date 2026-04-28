import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import ClassList from '@/components/ClassList';
import MyCategory from '@/components/Home/MyCategory';
import SelectCategory from '@/components/SelectCategory';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { motion } from 'framer-motion';
import useAppStore from '@/stores/useAppStore';
import type { ClassSummary } from '@/types/domain/class';

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
  const _id = useAppStore((state) => state.user.result._id);
  const selectCategory = useAppStore((state) => state.selectedCategory);
  const [classList, setClassList] = useState<ClassSummary[]>([]);
  const [myClassList, setMyClassList] = useState<ClassSummary[]>([]);
  const [width, setWidth] = useState(0);
  const [pages, setPages] = useState(0);
  const [hasData, setHasData] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const classListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios.post(`/api/class/list`, { selectCategory, pages }).then(({ data }) => {
      setClassList((prevItems) => {
        return [...prevItems, ...data];
      });
      setHasData(data.length > 0);
    });
  }, [selectCategory, pages]);

  useEffect(() => {
    if (_id) {
      axios.get(`/api/class/list/my/${_id}`).then(({ data }) => {
        setMyClassList(data);
      });
    }
  }, [_id]);

  useEffect(() => {
    if (myClassList.length) {
      setWidth((carouselRef.current?.scrollWidth ?? 0) - (carouselRef.current?.offsetWidth ?? 0));
    }
  }, [myClassList]);

  const handleScroll = () => {
    const scrollHeight = classListRef.current?.scrollHeight ?? 0;
    const scrollTop = classListRef.current?.scrollTop ?? 0;
    const clientHeight = classListRef.current?.clientHeight ?? 0;
    if (!hasData) {
      return;
    }
    if (scrollHeight === scrollTop + clientHeight) {
      setPages(pages + 1);
    }
  };

  useEffect(() => {
    const scrollClassList = classListRef.current;
    if (!scrollClassList) {
      return;
    }
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
                return <ClassList v={v} key={v._id} on={myClassList.map((item) => item.className).includes(v.className)} />;
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
