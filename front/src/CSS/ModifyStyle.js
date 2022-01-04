import styled from 'styled-components';

export const ModifyInfoTextArea = styled.textarea`
  border-radius: 4px;
  padding: 6px;
  width: 100%;
  height: 70px;
  border: 1px solid rgb(200, 200, 200);
  resize: none;
  outline: none;
  overflow: hidden;
`;

export const ModifyInfoInput = styled.input`
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

export const ButtonWrap = styled.div`
  border-top: 1px solid rgb(200, 200, 200);
  padding: 20px 0;
  text-align: center;
`;
export const ModifyButton = styled.button`
  margin-right: 20px;
  padding: 6px 14px;
  color: white;
  background: black;
  border-radius: 2px;

  &:last-child {
    margin-right: 0;
  }
`;
