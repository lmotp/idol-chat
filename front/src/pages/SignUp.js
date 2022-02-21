import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import BackBar from '../components/BackBar';
import {
  AuthButton,
  AuthButtonWrap,
  ErrorValue,
  Form,
  Input,
  InputWrap,
  Label,
  LocationButton,
  SignUpItemBox,
} from '../css/FormStyle';
import { BiCurrentLocation } from 'react-icons/bi';
import dotenv from 'dotenv';
import Modal from '../components/Modal/Modal';
import LocationModal from '../components/Modal/LocationModal';
dotenv.config();

const SignContainer = styled.section`
  width: 100%;
  height: 100vh;
`;

const Point = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 4px;
`;

const LabelGender = styled.label`
  padding: 12px 20px;
  margin-top: 10px;
  margin-right: 6px;
  font-size: 16px;
  font-weight: 700;
  color: rgb(196, 196, 196);
  background: transparent;
  border: 1px solid rgb(196, 196, 196);
  cursor: pointer;
  display: inline-block;
  border-radius: 3px;
`;

const InputCheckBox = styled.input`
  display: none;

  &:checked + ${LabelGender} {
    background: black;
    color: #fff;
  }
`;

export const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const nicknameRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCode, setErrorCode] = useState();
  const [radioSelect, setRadioSelect] = useState('nothing');
  const [modalState, setModalState] = useState(false);
  const [nowLocation, setNowLocation] = useState('');

  // 모달창 함수
  const ModalOpen = () => {
    setModalState(true);
  };

  const ModalClose = () => {
    setModalState(false);
  };

  // 현재위치 알아내는 함수
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

  // 회원가입시 에러 잡는함수
  const errorFunc = (code, message) => {
    setErrorMessage(message);
    setErrorCode(code);
  };

  // 성별 바꾸는 함수
  const radioCheckChange = (e) => {
    setRadioSelect(e.target.id);
  };

  // 회원가입
  const signUp = (e) => {
    e.preventDefault();
    const pswRgx = /^[a-zA-Z0-9!@#$%^&*]{8,16}/gm;
    const emailRgx = /^[0-9a-z]([-_.]?[0-9a-z])*@[a-z]*\.[a-z.]{2,3}$/gm;
    const nicknameRgx = /\s{1,8}/;

    const passwordConfirm = passwordConfirmRef.current.value;

    const info = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      nickname: nicknameRef.current.value,
      gender: radioSelect,
      location: nowLocation,
    };

    if (!info.email || !emailRgx.test(info.email)) {
      return errorFunc(0, '이메일 형식에 맞게 작성해주세요.');
    }

    if (!info.password || !passwordConfirm) {
      return errorFunc(1, '비밀번호를 입력해주세요');
    }

    if (!pswRgx.test(info.password)) {
      return errorFunc(4, '비밀번호는 8자리 이상으로 16자리 이하, !@#$%^&*를 포함해서 입력해주세요');
    }

    if (info.password !== passwordConfirm) {
      return errorFunc(2, '비밀번호가 일치하지 않습니다.');
    }

    if (!info.nickname || nicknameRgx.test(info.nickname)) {
      return errorFunc(3, '닉네임에 공백 없이 8자이하로 입력해주세요');
    }

    axios
      .post('/api/auth/signup', info)
      .then(({ data }) => {
        if (data.success) {
          navigate('/');
        } else {
          window.alert(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <SignContainer>
      <BackBar title="회원가입" />
      <Form>
        <InputWrap>
          <Label htmlFor="email">이메일</Label>
          <Point>*</Point>
          <Input type="text" id="email" placeholder="이메일을 입력해주세요." ref={emailRef} autoComplete="off"></Input>
          {errorCode === 0 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <InputWrap>
          <Label htmlFor="password">비밀번호</Label>
          <Point>*</Point>
          <Input
            autoComplete="off"
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            ref={passwordRef}
          ></Input>
          {errorCode === 1 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <InputWrap>
          <Label htmlFor="password-confirm">비밀번호 확인</Label>
          <Point>*</Point>
          <Input
            autoComplete="off"
            type="password"
            id="password-confirm"
            placeholder="비밀번호를 한번 더 입력해주세요."
            ref={passwordConfirmRef}
          ></Input>
          {errorCode === 2 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <InputWrap>
          <Label htmlFor="nickname">닉네임</Label>
          <Point>*</Point>
          <Input type="text" id="nickname" placeholder="닉네임을 입력해주세요." ref={nicknameRef}></Input>
          {errorCode === 3 && <ErrorValue>{errorMessage}</ErrorValue>}
        </InputWrap>

        <InputWrap>
          <Label htmlFor="nothing">성별</Label>
          <SignUpItemBox>
            <InputCheckBox
              type="radio"
              id="nothing"
              name="gender"
              checked={radioSelect === 'nothing'}
              onChange={radioCheckChange}
            />
            <LabelGender htmlFor="nothing">선택안함</LabelGender>

            <InputCheckBox
              type="radio"
              id="men"
              name="gender"
              checked={radioSelect === 'men'}
              onChange={radioCheckChange}
            />
            <LabelGender htmlFor="men">남성</LabelGender>

            <InputCheckBox
              type="radio"
              id="women"
              name="gender"
              checked={radioSelect === 'women'}
              onChange={radioCheckChange}
            />
            <LabelGender htmlFor="women">여성</LabelGender>
          </SignUpItemBox>
        </InputWrap>

        <InputWrap>
          <Label htmlFor="location">현재위치</Label>
          <SignUpItemBox>
            <Input
              autoComplete="none"
              type="text"
              id="location"
              placeholder="클릭해서 현재 위치를 알려주세요"
              value={nowLocation}
              onChange={(e) => setNowLocation(e.target.value)}
              onClick={ModalOpen}
              cursor="pointer"
              readOnly
            ></Input>
            <LocationButton onClick={nowLocationSurch}>
              <BiCurrentLocation size="24px" />
            </LocationButton>
          </SignUpItemBox>
        </InputWrap>

        <AuthButtonWrap>
          <AuthButton onClick={signUp} color="black">
            가입하기
          </AuthButton>
        </AuthButtonWrap>
      </Form>
      <Modal modalState={modalState}>
        <LocationModal setNowLocation={setNowLocation} ModalClose={ModalClose} />
      </Modal>
    </SignContainer>
  );
};
