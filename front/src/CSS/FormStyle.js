import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  padding: ${(props) => props.pd || '50px 40px'};
`;

export const InputWrap = styled.div`
  margin-bottom: 50px;
`;

export const Input = styled.input`
  width: ${(props) => props.width || '100%'};
  padding: 10px 0;
  outline: none;
  border: none;
  margin-left: ${(props) => props.ml || '0'};
  border-bottom: ${(props) => props.border || '1px solid'};
  font-size: ${(props) => props.fz || '16px'};
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
  margin: ${(props) => props.margin || '30px 0;'};
`;

export const AuthButtonWrap = styled.div`
  margin-top: 60px;
  text-align: center;
`;

export const ErrorValue = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 8px;
`;

export const SignUpItemBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Icon = styled.div`
  margin-right: 10px;
`;

export const Line = styled.div`
  text-align: center;
  position: relative;
  color: rgb(111, 111, 111);
  margin: ${(props) => props.margin || '0%'};

  &:before {
    width: ${(props) => props.width || '45%'};
    height: 1px;
    background: rgb(181, 181, 181);
    content: '';
    display: block;
    position: absolute;
    top: 50%;
  }
  &:after {
    width: ${(props) => props.width || '45%'};
    height: 1px;
    background: rgb(181, 181, 181);
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
  }
`;
