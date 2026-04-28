import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import useAppStore from '@/stores/useAppStore';
import type { CategoryOption } from '@/types/domain/category';

const ExampleCategory = styled.div<{ selectState?: boolean }>`
  display: inline-block;
  margin-right: 10px;
  padding: 6px 12px;
  border: 1px solid;
  cursor: pointer;
  background: ${({ selectState }) => (selectState ? 'black' : 'white')};
  color: ${({ selectState }) => (!selectState ? 'black' : 'white')};
  border-radius: 6px;

  &:last-child {
    margin-right: 0;
  }
`;

const DetailSelectCategory = ({ mainCategory }: { mainCategory: string }) => {
  const subCategory = useAppStore((state) => state.categories);
  const [example, setExample] = useState<string[]>([]);
  const [select, setSelect] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const example = subCategory
      .filter((v: CategoryOption) => v.category === mainCategory)
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
