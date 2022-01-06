import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { menuToggle } from '../../modules/actions/MemberListAction';
import { AiFillCloseCircle } from 'react-icons/ai';

const MemberListContainer = styled.div`
  width: 50%;
  height: 100vh;
  position: absolute;
  background: white;
  right: 0;
  top: 0;
  box-shadow: -8px 0 5px rgb(190, 190, 190, 0.2);
  transform: translateX(400px);
  transition: all 0.5s ease-in-out;
  ${({ state }) =>
    state &&
    css`
      transform: translateX(0);
    `}
`;

const MebmerListHeader = styled.div`
  width: 100%;
  padding: 20px 20px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(200, 200, 200);
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
  padding: 10px 14px;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 4px;
  margin-bottom: 21px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MemberListImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
`;
const MemberListNickName = styled.div`
  display: flex;
  width: 78%;
  justify-content: space-between;
`;

const MemberListMine = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(180, 180, 180);
  text-align: center;
  line-height: 20px;
  font-size: 13px;
  color: white;
`;

const MemberList = ({ testMember }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.chatMemberReducer);

  return (
    <>
      <MemberListContainer state={state}>
        <MebmerListHeader>
          <AiFillCloseCircle onClick={() => dispatch(menuToggle())} cursor="pointer" size="26px" />
          대화 참여자
        </MebmerListHeader>
        <MemberListInfoWrap>
          {testMember.map((v, i) => {
            return (
              <MemberListInfoBox key={i}>
                <MemberListImg src={v.img} />
                <MemberListNickName>
                  {v.nickName}
                  {v.me && <MemberListMine>나</MemberListMine>}
                </MemberListNickName>
              </MemberListInfoBox>
            );
          })}
        </MemberListInfoWrap>
      </MemberListContainer>
    </>
  );
};

export default MemberList;
