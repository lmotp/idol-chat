import axios from 'axios';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import dotenv from 'dotenv';

dotenv.config();

const LocationModalContainer = styled.div`
  width: 100%;
`;

const LocationForm = styled.form`
  width: 80%;
  margin: 0 auto;
  padding-top: 60px;
`;

const LocationSearchInput = styled.input`
  width: 100%;
  padding 10px;
  border-radius: 5px;
  border: 1px solid black;
  outline: none;
`;

const LocationItemBox = styled.ul`
  height:400px;
  margin-top:40px;
  border-top 1px solid black;
  overflow-y:scroll;
`;

const LocationItem = styled.li`
  width: 80%;
  margin: 16px auto;
  list-style: none;
  cursor: pointer;

  &:hover {
    color: rgb(181, 181, 181);
  }
`;

const LocationModal = ({ setNowLocation, ModalClose }) => {
  const locationSearchRef = useRef();
  const [locationItem, setLocationItem] = useState([]);

  const LocationSearchSubmit = (e) => {
    e.preventDefault();
    if (!locationSearchRef.current.value) {
      return;
    }
    axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json?query=${locationSearchRef.current.value}`, {
        headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API}` },
      })
      .then(({ data }) => {
        console.log(data);
        locationSearchRef.current.value = '';
        setLocationItem(data.documents);
      });
  };

  return (
    <>
      <LocationForm onSubmit={LocationSearchSubmit}>
        <LocationSearchInput type="text" ref={locationSearchRef} placeholder="동,구로 검색하세요. 예시)자양동" />
      </LocationForm>
      <LocationModalContainer>
        <LocationItemBox>
          {locationItem.map((v) => (
            <LocationItem
              key={v.id}
              onClick={() => {
                ModalClose();
                setNowLocation(v.address_name);
                setLocationItem([]);
              }}
            >
              {v.address_name}
            </LocationItem>
          ))}
        </LocationItemBox>
      </LocationModalContainer>
    </>
  );
};

export default LocationModal;
