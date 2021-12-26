const testCateoryList = [
  {
    category: '여자아이돌',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['마마무', '레드벨벳', '오마이걸', 'ITZY', '에스파(aespa)'],
  },
  {
    category: '남자아이돌',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['엑소', '방탄소년단', '세븐틴', 'WINNER', '하이라이트'],
  },
  {
    category: '솔로가수',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['아이유', '아리아나 그란데', '백예린', '정준일', '릴 나스 엑스'],
  },
  {
    category: '그룹가수',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['악동뮤지션', '다비치', '자우림', 'FT아일랜드', 'BEATLES'],
  },
  {
    category: '남자배우',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['강하늘', '정해인', '모건 프리먼', '라이온 고슬링', '오구리 슌'],
  },
  {
    category: '여자배우',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['한지민', '서현진', '레이첼 맥아담스', '스칼렛 요한슨', '우에노 주리'],
  },
  {
    category: '인디가수',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['10cm', '잔나비', '옥상달빛', '선우정아', '민수(Minsu)'],
  },
  {
    category: '애니',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['귀멸의 칼날', '디지몬', '포켓몬', '원피스', '도라에몽'],
  },
  {
    category: '소설',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['무라카미 하루키', '히가시노 게이고', 'J.K 롤링', '하퍼 리', '이외수'],
  },
  {
    category: '기타',
    img: 'https://img.etoday.co.kr/pto_db/2021/06/600/20210612184630_1631709_583_388.jpg',
    example: ['이 세계 아이돌', '해쭈', '고세구', '카미야 히로시', '배돈'],
  },
];

const mainCategoryReducer = (state = testCateoryList, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default mainCategoryReducer;
