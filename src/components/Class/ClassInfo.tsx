import React from 'react';
import { GrLocation } from 'react-icons/gr';
import { IoIosMore } from 'react-icons/io';
import styled from '@emotion/styled';
import { overlay } from 'overlay-kit';
import Modal from '@/components/Modal/Modal';
import ModifyClassInfo from '@/components/Modal/ModifyClassInfo';
import type { ClassSummary } from '@/types/domain/class';

type ClassInfoProps = {
  title: string;
  classTarget: string;
  location?: string;
  hashTag?: string[];
  category: string;
  admin?: boolean;
  id?: string;
} & Partial<Pick<ClassSummary, 'makeUser'>>;

const ClassInfoContainer = styled.div`
  margin-bottom: 54px;
  min-height: 20vh;
`;
const InfoHeader = styled.div`
  width: 100%;
  margin: 24px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(200, 200, 200);
`;

const TitleInfoWrap = styled.div`
  display: flex;
  align-items: center;
`;

const InfoLocation = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-right: 12px;
`;

const InfoLocationWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(220, 220, 220);
  width: 64px;
  padding: 8px 6px;
  font-size: 13px;
  border-radius: 6px;
`;

const InfoTitle = styled.h2``;

const InfoTagWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const InfoMainTag = styled.div`
  margin-right: 10px;
  font-size: 14px;
  background: #db7093;
  color: white;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 3px;
`;

const InfoHashTag = styled.div`
  margin-right: 10px;
  font-size: 14px;
`;

const InfoContent = styled.p`
  white-space: pre-wrap;
`;

const ClassInfo = ({ title, classTarget, location, hashTag, category, admin, id }: ClassInfoProps) => {
  const ModalOpen = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal open={isOpen} onClose={close} onExit={unmount} ariaLabel="모임 정보 수정">
        <ModifyClassInfo title={title} classTarget={classTarget} id={id} onClose={close} />
      </Modal>
    ));
  };
  return (
    <ClassInfoContainer>
      <InfoHeader>
        <TitleInfoWrap>
          <InfoLocation>
            <InfoLocationWrap>
              <GrLocation />
              {location}
            </InfoLocationWrap>
          </InfoLocation>
          <InfoTitle>{title}</InfoTitle>
        </TitleInfoWrap>
        {admin && <IoIosMore size="24px" cursor="pointer" onClick={ModalOpen} />}
      </InfoHeader>
      <InfoTagWrap>
        <InfoMainTag>#{category}</InfoMainTag>

        {hashTag && hashTag.map((v, i) => <InfoHashTag key={i}>#{v}</InfoHashTag>)}
      </InfoTagWrap>
      <InfoContent>{classTarget}</InfoContent>
    </ClassInfoContainer>
  );
};

export default ClassInfo;
