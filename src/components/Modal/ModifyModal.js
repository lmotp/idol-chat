import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiCamera } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userCheckActions } from '../../modules/actions/UserActions';

const ModifyModalContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const ModifyInfoWrap = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModifyImg = styled.input`
  display: none;
`;
const ModifyLabel = styled.label`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid rgb(200, 200, 200);
  overflow: hidden;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

const ModifyCamerraWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
  width: 100%;
  height: inherit;
  display: ${(props) => (props.hover ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const ModifyInfo = styled.div`
  width: 70%;
`;

const ModifyWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ModifyInfoInput = styled.input`
  border-radius: 4px;
  padding: 7px 8px;
  width: 100%;
  outline: none;
  border: 1px solid rgb(200, 200, 200);

  ::placeholder {
    font-size: 14px;
  }

  &:last-child {
    border: none;
    padding: 0;
  }
`;

const LabelGender = styled.label`
  padding: 6px 14px;
  margin-left: 6px;
  font-size: 16px;
  font-weight: 700;
  color: rgb(196, 196, 196);
  background: transparent;
  border: 1px solid rgb(196, 196, 196);
  cursor: pointer;
  display: inline-block;
  border-radius: 3px;
  width: 75px;
`;

const InputCheckBox = styled.input`
  display: none;

  &:checked + ${LabelGender} {
    background: black;
    color: #fff;
  }
`;

const ModifyInfoTextArea = styled.textarea`
  border-radius: 4px;
  padding: 6px;
  width: 100%;
  height: 70px;
  border: 1px solid rgb(200, 200, 200);
  resize: none;
`;

const ButtonWrap = styled.div`
  border-top: 1px solid rgb(200, 200, 200);
  padding: 20px 0;
  text-align: center;
`;
const ModifyButton = styled.button`
  margin-right: 20px;
  padding: 6px 14px;
  color: white;
  background: black;
  border-radius: 2px;

  &:last-child {
    margin-right: 0;
  }
`;

const ModifyModal = ({ setLoadingState, setModalState, id, img }) => {
  const { gender, nickname, myself } = useSelector((state) => state.userCheckReducers.result);
  const [imgHoverState, setImgHoverState] = useState(false);
  const [radioSelect, setRadioSelect] = useState(gender);
  const [nickName, setNickName] = useState(nickname);
  const [mySelf, setMySelf] = useState(myself);
  const [mainImg, setMainImg] = useState(img);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setMySelf(myself);
    setMainImg(img);
    setRadioSelect(gender);
    setNickName(nickname);
  }, [myself, img, gender, nickname]);

  const radioCheckChange = (e) => {
    setRadioSelect(e.target.id);
  };

  const ModalClose = () => {
    setMySelf(myself);
    setMainImg(img);
    setRadioSelect(gender);
    setNickName(nickname);
    setModalState(false);
  };

  const imgChange = (e) => {
    let theFile = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = (e) => {
      setMainImg(e.target.result);
      setFileName(theFile);
    };

    reader.readAsDataURL(theFile);
  };

  const ModifyFunc = () => {
    const formData = new FormData();
    const nicknameRgx = /\s{1,8}/gm;

    formData.append('image', fileName ? fileName : mainImg);
    formData.append('myself', mySelf);
    formData.append('nickname', nickName);
    formData.append('gender', radioSelect);
    formData.append('id', id);

    if (nicknameRgx.test(nickName)) {
      setError(true);
      setNickName('');
      return;
    } else {
      setLoadingState(true);

      axios.post('/api/auth/modify', formData).then(({ data }) => {
        ModalClose();
        dispatch(userCheckActions());
        setError(false);
        setLoadingState(false);
      });
    }
  };

  return (
    <>
      <ModifyModalContainer>
        <ModifyInfoWrap onSubmit={(e) => e.preventDefault()}>
          <ModifyImg type="file" id="img" onChange={imgChange} accept="image/*" />
          <ModifyLabel
            onMouseEnter={() => {
              setImgHoverState(true);
            }}
            onMouseLeave={() => {
              setImgHoverState(false);
            }}
            htmlFor="img"
            img={mainImg}
          >
            <ModifyCamerraWrap hover={imgHoverState}>
              <BiCamera size="33px" />
            </ModifyCamerraWrap>
          </ModifyLabel>
          <ModifyInfo>
            <ModifyWrap>
              <ModifyInfoInput
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                type="text"
                placeholder={error ? '공백 없이 8자 이하로 작성해주세요.' : '이름'}
              ></ModifyInfoInput>
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
            </ModifyWrap>

            <ModifyInfoTextArea
              value={mySelf}
              onChange={(e) => setMySelf(e.target.value)}
              type="text"
              placeholder="간략한 자기소개 써주세요."
              maxLength="60"
            ></ModifyInfoTextArea>
          </ModifyInfo>
        </ModifyInfoWrap>
      </ModifyModalContainer>
      <ButtonWrap>
        <ModifyButton onClick={ModifyFunc}>실행</ModifyButton>
        <ModifyButton onClick={ModalClose}>취소</ModifyButton>
      </ButtonWrap>
    </>
  );
};

export default ModifyModal;
