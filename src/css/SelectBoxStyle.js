import styled from 'styled-components';

export const SelectCategoryText = styled.span`
  margin-right: 12px;
  border: 1px solid #db7093;
  cursor: pointer;
  padding: 6px;
  border-radius: 3px;
  background-color: ${(props) => (props.select ? '#db7093' : 'white')};
  color: ${(props) => (props.select ? 'white' : '#db7093')};
  &:last-child {
    margin-right: 0;
  }
`;

export const SelectCategoryTextBox = styled.div``;

export const Hr = styled.hr`
  border: none;
  background: rgb(200, 200, 200);
  border-radius: 4px;
  height: 4px;
`;
