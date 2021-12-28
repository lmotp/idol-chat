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

const classListReducer = (state = testClassList, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default classListReducer;
