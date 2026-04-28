import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import styled from '@emotion/styled';
import { AuthButton } from '@/design-system/styles/FormStyle';
import type { ClassInviteRecord } from '@/types/domain/class';
import type { SrcProp } from '@/types/ui/styled-props';
const ClassInviteWrap = styled.div`
  margin-top: 36px;
`;

const InviteTitle = styled.h3`
  margin-bottom: 16px;
`;

const ButtonBox = styled.div`
  width: 16%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
`;

const InviteButtonLavel = styled.label<{ $active?: boolean }>`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? 'blue' : 'white')};
`;

const InviteButton = styled.input`
  display: none;
`;

const InviteUserListBox = styled.ul``;
const InviteUser = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;
const UserButtonBox = styled.div`
  height: 30px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  width: 82%;
`;

const UserProfileImg = styled.img<SrcProp>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  object-fit: cover;
`;

const UserInfoValue = styled.div`
  margin-left: 14px;
  width: 85%;
`;

const UserNickName = styled.div`
  margin-bottom: 6px;
  font-weight: bold;
`;
const UserMySelf = styled.p`
  font-size: 14px;
`;

const UserLocation = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

type Props = {
  category: string;
  location: string;
  classId: string;
};

const ClassInvite = ({ category, location, classId }: Props) => {
  const [inviteMemberList, setInviteMemberList] = useState<ClassInviteRecord[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`/api/class/invite/member/${category}/${location}/${classId}`).then(({ data }) => {
      setInviteMemberList(data);
    });
  }, [category, location, classId]);

  const inviteMeesageSend = () => {
    if (checkList.length === 0) {
      return window.alert('모임에 초대 할 사람이 없습니다!');
    }
    axios.post(`/api/class/invite/send`, { checkList, classId }).then(({ data }) => {
      setCheckList([]);
    });
  };

  return (
    <ClassInviteWrap>
      <InviteTitle>멤버 초대하기 ({location})</InviteTitle>
      <ButtonBox>
        <InviteButton
          id="allCheckBox"
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              const checkedListArray: string[] = [];
              inviteMemberList.forEach((list) => checkedListArray.push(list._id));
              setCheckList(checkedListArray);
            } else {
              setCheckList([]);
            }
          }}
          checked={checkList.length === 0 ? false : checkList.length === inviteMemberList.length ? true : false}
        />
        <InviteButtonLavel htmlFor="allCheckBox" $active={checkList.length > 0 && checkList.length === inviteMemberList.length} />
        전체 선택
      </ButtonBox>
      <InviteUserListBox>
        {inviteMemberList.map((v) => {
          return (
            <InviteUser key={v._id}>
              <UserButtonBox>
                <InviteButton
                  id={`checkBox${v._id}`}
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckList([...checkList, v._id]);
                    } else {
                      setCheckList(checkList.filter((el) => el !== v._id));
                    }
                  }}
                  checked={checkList.includes(v._id) ? true : false}
                />
                <InviteButtonLavel htmlFor={`checkBox${v._id}`} $active={checkList.includes(v._id)} />
              </UserButtonBox>
              <UserInfo>
                <UserProfileImg src={v.profileimg} />
                <UserInfoValue>
                  <UserNickName>{v.nickname}</UserNickName>
                  <UserMySelf>{String(v.myself ?? '')}</UserMySelf>
                </UserInfoValue>
              </UserInfo>
              <UserLocation>
                <GrLocation style={{ marginRight: '2px' }} />
                {v.location?.split(' ')[1]}
              </UserLocation>
            </InviteUser>
          );
        })}
      </InviteUserListBox>
      <AuthButton color="black" onClick={inviteMeesageSend}>
        모임 초대하기
      </AuthButton>
    </ClassInviteWrap>
  );
};

export default ClassInvite;
