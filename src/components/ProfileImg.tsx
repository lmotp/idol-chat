import React from 'react';
import styled from '@emotion/styled';
import type { SrcProp } from '@/types/ui/styled-props';

const ProfileImgWrap = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid rgb(200, 200, 200);
  overflow: hidden;
  display: flex;
`;

const InfoProfileImg = styled.img<SrcProp>`
  width: 100%;
  object-fit: cover;
`;

type Props = {
  profileimg?: string;
};

const ProfileImg = ({ profileimg }: Props) => {
  return (
    <ProfileImgWrap>
      <InfoProfileImg src={profileimg} />
    </ProfileImgWrap>
  );
};

export default ProfileImg;
