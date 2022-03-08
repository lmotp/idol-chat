import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ExampleCategory = styled.div`
  display: inline-block;
  margin-right: 10px;
  padding: 6px 12px;
  border: 1px solid;
  cursor: pointer;
  background: ${(props) => (props.selectState ? 'black' : 'white')};
  color: ${(props) => (!props.selectState ? 'black' : 'white')};
  border-radius: 6px;

  &:last-child {
    margin-right: 0;
  }
`;

const DetailSelectCategory = ({ mainCategory }) => {
  const subCategory = useSelector((state) => state.mainCategoryReducer);
  const [example, setExample] = useState([]);
  const [select, setSelect] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const example = subCategory
      .filter((v) => v.category === mainCategory)
      .map((v) => v.example)
      .flat();
    setSelect('');
    setExample(example);
  }, [mainCategory, subCategory]);

  return (
    <>
      {example.map((v, i) => {
        return (
          <ExampleCategory
            selectState={v === select}
            onClick={() => {
              setSelect(v);
              navigate(`/pages/search/${v}`, { state: { searchCategory: v, example: null } });
            }}
            key={i}
          >
            {v}
          </ExampleCategory>
        );
      })}
    </>
  );
};

export default DetailSelectCategory;
