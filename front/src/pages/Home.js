import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ClassList from '../components/ClassList';
import MyCategory from '../components/Home/MyCategory';
import SelectCategory from '../components/SelectCategory';
import { useSelector } from 'react-redux';
import { BsPlusCircleDotted } from 'react-icons/bs';

const HomeContainer = styled.div``;

const MyCategroyBox = styled.div`
  width: 100%;
  height: 160px;
  border-bottom: 1px solid rgb(200, 200, 200);
  display: flex;
  padding-left: 5%;
  overflow-x: hidden;
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

  useEffect(() => {
    axios.post(`/api/class/list`, { selectCategory }).then(({ data }) => setClassList(data));
  }, [selectCategory, _id]);

  useEffect(() => {
    axios.get(`/api/class/list/my/${_id}`).then(({ data }) => {
      setMyClassList(data);
    });
  }, [_id]);

  return (
    <HomeContainer>
      <MyCategroyBox>
        {myClassList.length ? (
          myClassList.map((v, i) => {
            return <MyCategory v={v} key={i} />;
          })
        ) : (
          <MyCategoryNone>
            지금 모임에 가입해보세요
            <BsPlusCircleDotted style={{ marginLeft: '6px' }} />
          </MyCategoryNone>
        )}
      </MyCategroyBox>

      <HomeClassListBox>
        <SelectCategory />
        <ClassListWrap>
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
