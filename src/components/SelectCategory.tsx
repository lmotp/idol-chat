import React, { useEffect, memo } from 'react';
import styled from '@emotion/styled';
import { IoIosMore } from 'react-icons/io';
import SettingModal from '@/components/Modal/SettingModal';
import { SelectCategoryText, SelectCategoryTextBox } from '@/design-system/styles/SelectBoxStyle';
import { useLocation } from 'react-router-dom';
import useAppStore from '@/stores/useAppStore';
import { overlay } from 'overlay-kit';
import Modal from '@/components/Modal/Modal';

type SelectCategoryProps = {
  pagesHandler?: () => void;
};

const SelectCategoryContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 24px auto;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const SelectCategory = ({ pagesHandler }: SelectCategoryProps) => {
  const category = useAppStore((state) => state.user.result.category ?? []);
  const _id = useAppStore((state) => state.user.result._id);
  const selectCategory = useAppStore((state) => state.selectedCategory);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);
  const resetSelectedCategory = useAppStore((state) => state.resetSelectedCategory);
  const { pathname } = useLocation();

  useEffect(() => {
    resetSelectedCategory();
  }, [pathname, resetSelectedCategory]);

  const settingModalOpen = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal open={isOpen} onClose={close} onExit={unmount} ariaLabel="관심사 추가">
        <SettingModal category={category} onClose={close} userId={_id} />
      </Modal>
    ));
  };

  return (
    <>
      {category ? (
        <SelectCategoryContainer>
          <SelectCategoryTextBox>
            {category.map((v, i) => (
              <SelectCategoryText
                select={v === selectCategory}
                onClick={() => {
                  setSelectedCategory(v);
                  if (pagesHandler) {
                    pagesHandler();
                  }
                }}
                key={i}
              >
                {v}
              </SelectCategoryText>
            ))}
          </SelectCategoryTextBox>

          <IoIosMore style={{ cursor: 'pointer' }} size="24px" onClick={settingModalOpen} />
        </SelectCategoryContainer>
      ) : null}
    </>
  );
};

export default memo(SelectCategory);
