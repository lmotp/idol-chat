import catroon from '../../images/category-01.png';
import manActor from '../../images/category-02.png';
import group from '../../images/category-03.png';
import movie from '../../images/category-04.png';
import youtube from '../../images/category-05.png';
import womanlActor from '../../images/category-06.png';
import solo from '../../images/category-07.png';
import girIdol from '../../images/category-08.png';
import boyIdol from '../../images/category-09.png';
import ex from '../../images/category-10.png';

const testCateoryList = [
  {
    category: '여자아이돌',
    img: girIdol,
    example: ['마마무', '레드벨벳', '오마이걸', 'ITZY', '에스파(aespa)'],
    color: '#fd778a',
  },
  {
    category: '남자아이돌',
    img: boyIdol,
    example: ['엑소', '방탄소년단', '세븐틴', 'WINNER', '하이라이트'],
    color: '#62abf1',
  },
  {
    category: '솔로가수',
    img: solo,
    example: ['아이유', '아리아나 그란데', '백예린', '정준일', '릴 나스 엑스'],
    color: '#9e5ed7',
  },
  {
    category: '그룹가수',
    img: group,
    example: ['악동뮤지션', '다비치', '자우림', 'FT아일랜드', 'BEATLES'],
    color: '#e76154',
  },
  {
    category: '여자배우',
    img: womanlActor,
    example: ['한지민', '서현진', '레이첼 맥아담스', '스칼렛 요한슨', '우에노 주리'],
    color: '#d153a6',
  },
  {
    category: '남자배우',
    img: manActor,
    example: ['강하늘', '정해인', '모건 프리먼', '라이온 고슬링', '오구리 슌'],
    color: '#475ed2',
  },
  {
    category: '유튜버',
    img: youtube,
    example: ['해쭈', '배돈(Baedon)', '동년배들 다 김달걀 본다', '웃소', '오킹TV'],
    color: '#a1b23e',
  },
  {
    category: '영화',
    img: movie,
    example: ['해리포터', '마블 유니버스', 'DC 유니버스', '월트 디즈니', '스튜디오 지브리'],
    color: '#ffd059',
  },
  {
    category: '애니',
    img: catroon,
    example: ['귀멸의 칼날', '디지몬', '포켓몬', '원피스', '도라에몽'],
    color: '#d3dc95',
  },
  {
    category: '기타',
    img: ex,
    example: ['이외수', '온다리쿠', '히가시노 게이고', '카미야 히로시', '유진박'],
    color: '#bdbdbd',
  },
];

const mainCategoryReducer = (state = testCateoryList, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default mainCategoryReducer;
