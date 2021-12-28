import React from 'react';

import styled from 'styled-components';

const ProfileImgWrap = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid rgb(200, 200, 200);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoProfileImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 100%;
  object-fit: cover;
`;

const ProfileImg = ({ profileImgSrc }) => {
  return (
    <ProfileImgWrap>
      <InfoProfileImg src={profileImgSrc} />
    </ProfileImgWrap>
  );
};

export default ProfileImg;
