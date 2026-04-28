import React, { useRef, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { kakaoRestApi } from '@/config/env';
import type { ChangeEvent, FormEvent } from 'react';
import type { Dictionary } from '@/types/shared';

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
const ErrorValue = styled.div`
  font-size: 14px;
  margin-top: 6px;
  color: red;
`;

const LocationItemBox = styled.ul`
  height:400px;
  margin-top:30px;
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

const ModalButtonBox = styled.div`
  padding: 20px;
  text-align: center;
  border-top: 1px solid black;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  margin-right: 6px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background: black;
  cursor: pointer;
  display: inline-block;
  border-radius: 3px;
`;

const LocationModal = ({
  setNowLocation,
  onClose,
}: {
  setNowLocation: (value: string) => void;
  onClose?: () => void;
}) => {
  const locationSearchRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState(false);
  const [locationItem, setLocationItem] = useState<Array<{ address_name: string }>>([]);

  const LocationSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkRgx = /[구동]/gm;
    const input = locationSearchRef.current;

    if (!input?.value) {
      return;
    }
    if (!checkRgx.test(input.value)) {
      input.focus();
      input.value = '';
      setError(true);
      return;
    }

    axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json?size=30&query=${input.value}`, {
        headers: { Authorization: `KakaoAK ${kakaoRestApi}` },
      })
      .then(({ data }) => {
        setError(false);
        input.value = '';
        setLocationItem(data.documents);
      });
  };

  return (
    <>
      <LocationForm onSubmit={LocationSearchSubmit}>
        <LocationSearchInput type="text" ref={locationSearchRef} placeholder="동,구로 검색하세요. 예시)자양동" />
        {error && <ErrorValue>검색어에 (구,둥)이 들어간 주소로 다시 입력해주세요.</ErrorValue>}
      </LocationForm>
      <LocationModalContainer>
        <LocationItemBox>
          {locationItem.map((v) => (
            <LocationItem
              key={v.address_name}
              onClick={() => {
                onClose?.();
                setNowLocation(v.address_name);
                setLocationItem([]);
              }}
            >
              {v.address_name}
            </LocationItem>
          ))}
        </LocationItemBox>
        <ModalButtonBox>
          <ModalButton
            type="button"
            onClick={() => {
              onClose?.();
              setLocationItem([]);
            }}
          >
            취소
          </ModalButton>
        </ModalButtonBox>
      </LocationModalContainer>
    </>
  );
};

export default LocationModal;
