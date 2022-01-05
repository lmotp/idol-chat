import axios from 'axios';
import React, { useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LocationModal from '../components/Modal/LocationModal';
import Modal from '../components/Modal/Modal';
import { AuthButton, ClassMemberCount, ClassMemberCountWrap, LocationButton } from '../css/FormStyle';
import { ModifyInfoInput, ModifyInfoTextArea } from '../css/ModifyStyle';

const MakeClassContainer = styled.div`
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 90px;
`;

const MakeCategoryWrap = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const CategoryList = styled.li`
  width: 19%;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
`;

const CategoryListLogo = styled.div`
  overflow: hidden;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  width: 33px;
  height: 33px;
  border-radius: 50%;
  cursor: pointer;
`;

const CategoryListValue = styled.div`
  margin-left: 10px;
`;

const MakeClassWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: blue;
  object-fit: cover;
`;

const ModifyInfoSubTitleWrap = styled.div``;

const MakeClass = () => {
  const [modalState, setModalState] = useState(false);
  const [nowLocation, setNowLocation] = useState('');
  const [subTitleValue, setSubTitleValue] = useState('');
  const category = useSelector((state) => state.mainCategoryReducer);

  const nowLocationSurch = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.longitude, position.coords.latitude);
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

  return (
    <MakeClassContainer>
      <MakeCategoryWrap>
        {category.map((v, i) => {
          return (
            <CategoryList key={i}>
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
          <MakeClassNameLogo src={category[0].img} />
        </MakeClassNameLogoWrap>
        <ModifyInfoInput type="text" placeholder="모임 이름" />
      </MakeClassWrap>

      <ModifyInfoSubTitleWrap>
        <ModifyInfoTextArea
          value={subTitleValue}
          onChange={(e) => setSubTitleValue(e.target.value)}
          type="text"
          placeholder="모임 폭표를 설정해주세요."
          height="180px"
        />
      </ModifyInfoSubTitleWrap>
      <ClassMemberCountWrap>
        <ClassMemberCount>
          <BsFillPersonPlusFill size="18px" style={{ marginRight: '10px' }} />
          정원 (20 ~ 20명)
        </ClassMemberCount>
        <ModifyInfoInput al="center" width="10%" type="text" placeholder="20" />
      </ClassMemberCountWrap>

      <AuthButton color="black" margin="33px 0">
        만들기
      </AuthButton>

      <Modal modalState={modalState}>
        <LocationModal setNowLocation={setNowLocation} ModalClose={ModalClose} />
      </Modal>
    </MakeClassContainer>
  );
};

export default MakeClass;
