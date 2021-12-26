import React from 'react';
import styled from 'styled-components';
import HomeClassList from '../components/Home/HomeClassList';
import MyCategory from '../components/Home/MyCategory';
import SelectCategory from '../components/Home/SelectCategory';

const HomeContainer = styled.div`
  padding-bottom: 70px;
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

  const testClassList = [
    {
      thumnail: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
      location: '용산구',
      mainTitle: '휘인와 조깅조깅',
      subTitle: '같이 덕질을 하면서 운동까지 겸사겸사 챙기는 모임! 알아서 글자수 맞춰주세요 이게 맞는지 궁금합니다',
      mainTag: '여자아이돌',
      hasTag: ['마마무', '휘인', '조깅', '한강'],
      memberCount: 10,
    },
    {
      thumnail: 'http://newsimg.hankookilbo.com/2018/01/02/201801021740746656_4.jpg',
      location: '은평구',
      mainTitle: '피아노의 디링디링',
      subTitle:
        '평상시에 마마무 노래를 듣기만했으면 이제는 같이 만들어가자.글자를 많이 많이 처보자고 이렇게 치면은 더 많아지나요?',
      mainTag: '여자아이돌',
      hasTag: ['마마무', '휘인', '피아노', '단체'],
      memberCount: 5,
    },
  ];

  return (
    <HomeContainer>
      <MyCategroyBox>
        {testImage.map((v, i) => {
          return <MyCategory v={v} key={i} />;
        })}
      </MyCategroyBox>
      <SelectCategory />
      <HomeClassListBox>
        {testClassList.map((v, i) => {
          return <HomeClassList v={v} key={i} />;
        })}
      </HomeClassListBox>
    </HomeContainer>
  );
};

export default Home;
