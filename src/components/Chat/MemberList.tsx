import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '@/design-system/theme';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAppStore from '@/stores/useAppStore';
import type { ClassMemberRecord } from '@/types/domain/class';
import type { SrcProp } from '@/types/ui/styled-props';

const MemberListContainer = styled.div<{ state?: boolean }>`
  width: min(50%, 420px);
  height: 100vh;
  position: absolute;
  background: ${theme.colors.surfaceElevated};
  right: 0;
  top: 0;
  box-shadow: -12px 0 32px rgba(23, 19, 18, 0.12);
  transform: translateX(400px);
  transition: all 0.5s ease-in-out;
  z-index: 1000;
  ${({ state }) =>
    state &&
    css`
      transform: translateX(0);
    `}
`;

const MebmerListHeader = styled.div`
  width: 100%;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.border};
  background: linear-gradient(180deg, ${theme.colors.surfaceElevated}, ${theme.colors.backgroundSoft});
  font-weight: 600;
`;

const MemberListInfoWrap = styled.ul`
  padding: 20px;
  overflow-y: scroll;
  height: 93vh;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const MemberListInfoBox = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  margin-bottom: 16px;
  background: ${theme.colors.backgroundSoft};

  &:last-child {
    margin-bottom: 0;
  }
`;

const MemberListImg = styled.img<SrcProp>`
  width: 56px;
  height: 56px;
  border-radius: ${theme.radii.round};
  overflow: hidden;
  object-fit: cover;
  border: 1px solid ${theme.colors.border};
`;
const MemberListNickName = styled.div`
  display: flex;
  width: 78%;
  justify-content: space-between;
`;

const MemberListMine = styled.div`
  width: 20px;
  height: 20px;
  border-radius: ${theme.radii.round};
  background-color: ${theme.colors.primary};
  text-align: center;
  line-height: 20px;
  font-size: 13px;
  color: ${theme.colors.surfaceElevated};
`;

const MemberList = ({ _id }: { _id?: string }) => {
  const [mebmerList, setMemberList] = useState<ClassMemberRecord[]>([]);
  const [myProfile, setMyProfile] = useState<ClassMemberRecord[]>([]);
  const state = useAppStore((state) => state.chatMemberOpen);
  const toggleChatMember = useAppStore((state) => state.toggleChatMember);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/class/info/member/${id}`).then(({ data }) => {
      const memberData = data as ClassMemberRecord[];
      setMyProfile(memberData.filter((v: ClassMemberRecord) => v._id === _id));
      setMemberList(memberData);
    });
  }, [id, _id]);

  return (
    <>
      <MemberListContainer state={state}>
        <MebmerListHeader>
          <AiFillCloseCircle onClick={toggleChatMember} cursor="pointer" size="26px" />
          대화 참여자
        </MebmerListHeader>
        <MemberListInfoWrap>
          {myProfile.length > 0 && (
            <MemberListInfoBox>
              <MemberListImg src={myProfile[0].profileImg} />
              <MemberListNickName>
                {myProfile[0].nickName}
                <MemberListMine>나</MemberListMine>
              </MemberListNickName>
            </MemberListInfoBox>
          )}
          {mebmerList
            .filter((v: ClassMemberRecord) => v._id !== _id)
            .map((v: ClassMemberRecord, i: number) => {
              return (
                <MemberListInfoBox key={i}>
                  <MemberListImg src={v.profileImg} />
                  <MemberListNickName>{v.nickName}</MemberListNickName>
                </MemberListInfoBox>
              );
            })}
        </MemberListInfoWrap>
      </MemberListContainer>
    </>
  );
};

export default MemberList;
