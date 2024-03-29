import axios from 'axios';
import React, { useRef, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackBar from '../components/BackBar';
import ClassMakeHashTag from '../components/MakeClass/ClassMakeHashTag';
import LocationModal from '../components/Modal/LocationModal';
import Modal from '../components/Modal/Modal';
import { AuthButton, ClassMemberCount, ClassMemberCountWrap, LocationButton } from '../css/FormStyle';
import { ModifyInfoInput, ModifyInfoTextArea } from '../css/ModifyStyle';

const MakeClassContainer = styled.div`
  width: 90%;
  height: 89vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
`;

const MakeCategoryWrap = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start; ;
`;

const CategoryList = styled.li`
  width: 19%;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  border: 1px solid rgb(200, 200, 200);
  border-color: ${(props) => props.select && '#6667ab'};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:nth-child(n + 4) {
    margin-bottom: 33px;
  }
`;

const CategoryListLogo = styled.div`
  overflow: hidden;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
`;

const CategoryListValue = styled.div``;

const MakeClassWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 33px;
`;
const LocationTitle = styled.div`
  width: 16%;
  display: flex;
  align-items: center;
`;

const MakeClassNameLogoWrap = styled.div`
  width: 8%;
  display: flex;
  overflow: hidden;
`;
const MakeClassNameLogo = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgb(200, 200, 200);
  object-fit: cover;
`;

const ModifyInfoSubTitleWrap = styled.div``;

const ErrorContent = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  visibility: ${(props) => (props.error ? 'visible' : 'hidden')};
`;

const MakeClass = () => {
  const [modalState, setModalState] = useState(false);
  const [nowLocation, setNowLocation] = useState('');
  const [categoryValue, setCategoryValue] = useState('여자아이돌');
  const [categorySrc, setCategorySrc] = useState('');
  const [hashTag, setHashTag] = useState([]);
  const classNameRef = useRef('');
  const classTargetRef = useRef('');
  const memberCountRef = useRef(1);
  const category = useSelector((state) => state.mainCategoryReducer);
  const { _id } = useSelector((state) => state.userCheckReducers.result);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const nowLocationSurch = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios
          .get(
            `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.coords.longitude}&y=${position.coords.latitude}`,
            {
              headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API}` },
            },
          )
          .then(({ data }) => {
            setNowLocation(data.documents[0].address.address_name);
          });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const ModalOpen = () => {
    setModalState(true);
  };

  const ModalClose = () => {
    setModalState(false);
  };

  const makeClassFunc = () => {
    if (!nowLocation) {
      ModalOpen();
      return setError('모임이 지역을 선택창에서 설정해주세요!');
    } else if (!classNameRef.current.value) {
      classNameRef.current.focus();
      return setError('모임명을 입력해 주세요!');
    } else if (!classTargetRef.current.value) {
      classTargetRef.current.focus();
      return setError('모임 설명을 입력해주세요!');
    } else {
      setError('');

      if (!hashTag.length) {
        let real = window.confirm('태그는 변경이 불가합니다. 태그 없이 개설 할까요?');

        if (!real) {
          return;
        }
      }
      axios
        .post('/api/class/make', {
          location: nowLocation,
          category: categoryValue,
          className: classNameRef.current.value,
          classTarget: classTargetRef.current.value,
          memberCount: 20,
          makeUser: _id,
          hashTag,
        })
        .then(({ data }) => {
          navigate(`/pages/class/${data}`);
        });
    }
  };

  return (
    <>
      <BackBar title="모임 만들기" />

      <MakeClassContainer>
        <MakeCategoryWrap>
          {category.map((v, i) => {
            return (
              <CategoryList
                key={i}
                onClick={() => {
                  setCategoryValue(v.category);
                  setCategorySrc(v.img);
                }}
                select={categoryValue === v.category}
              >
                <CategoryListLogo src={v.img} />
                <CategoryListValue>{v.category}</CategoryListValue>
              </CategoryList>
            );
          })}
        </MakeCategoryWrap>

        <MakeClassWrap>
          <LocationTitle>
            <GrLocation size="16px" style={{ marginRight: '4px' }} />
            지역
          </LocationTitle>
          <ModifyInfoInput
            autoComplete="none"
            type="text"
            id="location"
            placeholder="클릭해서 현재 위치를 알려주세요"
            value={nowLocation}
            onChange={(e) => setNowLocation(e.target.value)}
            onClick={ModalOpen}
            style={{ cursor: 'pointer' }}
            readOnly
          />
          <LocationButton onClick={nowLocationSurch}>
            <BiCurrentLocation size="24px" />
          </LocationButton>
        </MakeClassWrap>

        <MakeClassWrap>
          <MakeClassNameLogoWrap>
            <MakeClassNameLogo src={categorySrc ? categorySrc : category[0].img} />
          </MakeClassNameLogoWrap>
          <ModifyInfoInput type="text" placeholder="모임 이름" ref={classNameRef} />
        </MakeClassWrap>

        <ModifyInfoSubTitleWrap>
          <ModifyInfoTextArea type="text" placeholder="모임 폭표를 설정해주세요." height="180px" ref={classTargetRef} />
        </ModifyInfoSubTitleWrap>
        <ClassMemberCountWrap>
          <ClassMemberCount>
            <BsFillPersonPlusFill size="18px" style={{ marginRight: '10px' }} />
            정원 (20 ~ 20명)
          </ClassMemberCount>
          <ModifyInfoInput al="center" width="10%" type="text" placeholder="20" ref={memberCountRef} readOnly />
        </ClassMemberCountWrap>

        <ClassMakeHashTag hashTag={hashTag} setHashTag={setHashTag} />

        <ErrorContent error={error}>* {error}</ErrorContent>

        <AuthButton color="black" margin="24px 0" onClick={makeClassFunc}>
          개설하기
        </AuthButton>

        <Modal modalState={modalState}>
          <LocationModal setNowLocation={setNowLocation} ModalClose={ModalClose} />
        </Modal>
      </MakeClassContainer>
    </>
  );
};

export default MakeClass;
