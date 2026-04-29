import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { apiClient } from '@/app/apiClient';
import { ButtonWrap, ModifyButton } from '@/design-system/styles/ModifyStyle';
import useAppStore from '@/stores/useAppStore';
import type { CategoryOption } from '@/types/domain/category';

const SettingModalConatiner = styled.div<{ modalState?: boolean }>`
  width: 30%;
  background: white;
  border: 1px solid rgb(200, 200, 200);
  position: absolute;
  right: 3%;
  top: 82%;
  z-index: 9999;

  ${({ modalState }) =>
    modalState &&
    css`
      display: block;
      align-items: center;
    `}
`;

const SettingModalBox = styled.div<{ modalState?: boolean }>`
  width: 100%;
  background: white;
  padding: 10px;
  z-index: 9999;

  ${({ modalState }) =>
    modalState &&
    css`
      display: block;
      align-items: center;
    `}
`;

const SettingModalTitle = styled.div`
  border-bottom: 1px solid rgb(200, 200, 200);
  margin-bottom: 10px;
  padding-bottom: 5px;
  font-size: 16px;
`;

const SettingModalCategory = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
`;

const CategoryList = styled.li<{ select?: boolean }>`
  width: 40%;
  margin: 4px 0;
  cursor: pointer;
  padding: 4px;

  &:nth-child(n + 9) {
    margin: 0;
  }

  ${({ select }) =>
    select &&
    css`
      background: #db7093;
      color: white;
    `}
`;

const SettingModal = ({
  category,
  onClose,
  userId,
}: {
  category: string[];
  onClose?: () => void;
  userId?: string;
}) => {
  const mainCategory = useAppStore((state) => state.categories);
  const [selectCategry, setSelectCategory] = useState([...category]);
  const fetchUser = useAppStore((state) => state.fetchUser);

  const selectCategoryFunc = (select: string) => {
    if (selectCategry.includes(select)) {
      const filter = selectCategry.filter((v) => v !== select);
      setSelectCategory(filter);
      return;
    } else {
      setSelectCategory([...selectCategry, select]);
    }
  };
  const modifyCategoryFunc = () => {
    apiClient.post('/api/auth/category/modify', { selectCategry, userId }).then((data) => {
      void fetchUser();
    });
    onClose?.();
  };

  return (
    <SettingModalConatiner>
      <SettingModalBox>
        <SettingModalTitle>관심사 추가</SettingModalTitle>
        <SettingModalCategory>
          {mainCategory.map((v, i) => {
            return (
              <CategoryList
                onClick={() => selectCategoryFunc(v.category)}
                select={selectCategry.includes(v.category)}
                key={i}
              >
                {v.category}
              </CategoryList>
            );
          })}
        </SettingModalCategory>
      </SettingModalBox>
      <ButtonWrap>
        <ModifyButton type="button" onClick={modifyCategoryFunc}>
          실행
        </ModifyButton>
        <ModifyButton
          type="button"
          onClick={() => {
            onClose?.();
          }}
        >
          취소
        </ModifyButton>
      </ButtonWrap>
    </SettingModalConatiner>
  );
};

export default SettingModal;
