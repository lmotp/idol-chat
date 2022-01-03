import React, { useState } from 'react';
import { BiCamera } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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

const ModifyModal = ({ ModalClose }) => {
  const { profileimg, gender, nickname, myself } = useSelector((state) => state.userCheckReducers.result);
  const [imgHoverState, setImgHoverState] = useState(false);
  const [radioSelect, setRadioSelect] = useState(gender);
  const [nickName, setNickName] = useState(nickname);
  const [mySelf, setMySelf] = useState(myself);

  const radioCheckChange = (e) => {
    setRadioSelect(e.target.id);
  };

  return (
    <>
      <ModifyModalContainer>
        <ModifyInfoWrap>
          <ModifyImg type="file" id="img"></ModifyImg>
          <ModifyLabel
            onMouseEnter={() => {
              setImgHoverState(true);
            }}
            onMouseLeave={() => {
              setImgHoverState(false);
            }}
            htmlFor="img"
            img={profileimg}
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
                placeholder="이름"
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
        <ModifyButton>실행</ModifyButton>
        <ModifyButton onClick={ModalClose}>취소</ModifyButton>
      </ButtonWrap>
    </>
  );
};

export default ModifyModal;
