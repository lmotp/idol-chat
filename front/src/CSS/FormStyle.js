import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  padding: 50px 40px;
`;

export const InputWrap = styled.div`
  margin-bottom: 32px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  outline: none;
  border: none;
  border-bottom: 1px solid;
  font-size: 16px;
  font-weight: bold;
  cursor: ${(props) => props.cursor || 'auto'};
  ::placeholder {
    color: black;
    font-weight: bold;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: rgb(181, 181, 181);
`;

export const AuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 100%;
  height: 50px;
  color: white;
  background: ${(props) => props.color};
  border-radius: 5px;
  margin: 30px 0;
`;

export const AuthButtonWrap = styled.div`
  margin-top: 70px;
  text-align: center;
`;

export const ErrorValue = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 8px;
`;

export const SignUpItemBox = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: flex-end;
`;
