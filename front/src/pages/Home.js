import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ClassList from '../components/ClassList';
import MyCategory from '../components/Home/MyCategory';
import SelectCategory from '../components/SelectCategory';

const HomeContainer = styled.div`
  padding-bottom: 90px;
`;

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

const Home = () => {
  const classList = useSelector((state) => state.classListReducer);

  const testImage = [
    {
      thumnail:
        'https://www.akbonara.co.kr/uploads/cache/cmallitem/2020/11/thumb-e0c036e075e40ead92b59bb063a8de24_200x200.jpg',
      className: 'TRAVEL',
    },
    {
      thumnail:
        'https://www.akbonara.co.kr/uploads/cache/cmallitem/2019/11/thumb-0d1ef6386e191db7bbd300a05b0bf87a_200x200.png',
      className: 'reality in BLACK',
    },
    {
      thumnail:
        'https://www.akbonara.co.kr/uploads/cache/cmallitem/2021/12/thumb-67c7cdeb9d5e3a9cf50b0e106696ee68_200x200.jpg',
      className: '홀로 크리스마스',
    },
    {
      thumnail:
        'https://www.akbonara.co.kr/uploads/cache/cmallitem/2018/05/thumb-eaf754dfc30e2f97b52b050c0aa4beac_200x200.jpg',
      className: 'MAGNOLIA',
    },
    {
      thumnail: 'https://www.akbonara.co.kr/uploads/cache/cmallitem/mig_171026/thumb-album_995754_jpg881_200x200.jpg',
      className: '이니시아 네스트 OST',
    },
    {
      thumnail: 'https://www.akbonara.co.kr/uploads/cache/cmallitem/mig_171026/thumb-album_995754_jpg881_200x200.jpg',
      className: '이니시아 네스트 OST',
    },
    {
      thumnail: 'https://www.akbonara.co.kr/uploads/cache/cmallitem/mig_171026/thumb-album_995754_jpg881_200x200.jpg',
      className: '이니시아 네스트 OST',
    },
    {
      thumnail: 'https://www.akbonara.co.kr/uploads/cache/cmallitem/mig_171026/thumb-album_995754_jpg881_200x200.jpg',
      className: '이니시아 네스트 OST',
    },
  ];

  return (
    <HomeContainer>
      <MyCategroyBox>
        {testImage.map((v, i) => {
          return <MyCategory v={v} key={i} />;
        })}
      </MyCategroyBox>
      <HomeClassListBox>
        <SelectCategory />
        {classList.map((v, i) => {
          return <ClassList v={v} key={i} />;
        })}
      </HomeClassListBox>
    </HomeContainer>
  );
};

export default Home;
