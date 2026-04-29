import React, { useEffect, useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import styled from '@emotion/styled';
import { MdOutlineLocalPostOffice } from 'react-icons/md';
import { apiClient } from '@/app/apiClient';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import useAppStore from '@/stores/useAppStore';
import type { ClassInviteRecord } from '@/types/domain/class';

type BoxProps = {
  width?: string;
  src?: string;
  order?: string;
  ml?: string;
  jc?: string;
  al?: string;
  mt?: string;
  mb?: string;
};

const InviteMessageBoxContianer = styled.ul`
  height: 52vh;
  overflow-y: scroll;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const ListtHumbnail = styled.div<BoxProps>`
  width: ${({ width }) => width || '40%'};
  height: auto;
  border-radius: 10px;
  background: ${({ src }) => (src ? 'url(' + src + ')' : 'white')} center no-repeat;
  background-size: cover;
  border: ${({ src }) => !src && '1px solid rgb(180,180,180)'};
  border-style: ${({ src }) => !src && 'dashed'};
  order: ${({ order }) => order || '0'};
`;

const ListInfoWrap = styled.div<BoxProps>`
  width: ${({ width }) => width || '46%'};
  margin-left: ${({ ml }) => ml || '-12px'};
  display: flex;
  flex-direction: column;
  justify-content: ${({ jc }) => jc || 'space-between'};
  align-items: ${({ al }) => (al || 'flex-start')};
  order: ${({ order }) => order || '0'};
`;

const InfoMainTitle = styled.h2`
  font-weight: bold;
  font-size: 30px;
`;

const InfoHasTagWrap = styled.div<BoxProps>`
  display: flex;
  align-items: center;
  margin-top: ${({ mt }) => mt || '0'};
`;

const InfoMainHasTag = styled.span`
  margin-right: 6px;
  font-size: 12px;
  background: #db7093;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
`;

const InfoHasTag = styled.span`
  margin-right: 6px;
  font-size: 12px;
  color: black;
  cursor: pointer;
  border-radius: 3px;

  &: last-child {
    margin-right: 0;
  }
`;

const InfoLocation = styled.div<BoxProps>`
  display: flex;
  cursor: pointer;
  margin-bottom: ${({ mb }) => mb || '0'};
  align-self: ${({ al }) => al || 'auto'};
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

const InviteMessageListWrap = styled.li`
  padding: 20px;
  height: 130px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 6px;
  display: flex;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 4px;
  }
`;

const InviteMessageTimeWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
`;
const InviteMessageDay = styled.div`
  font-size: 13px;
  margin: 0 6px 0 3px;
`;
const InviteMessageTime = styled.div`
  font-size: 13px;
`;

const InvitedNotMessage = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InviteMessageBox = () => {
  const _id = useAppStore((state) => state.user.result._id);
  const [classLists, setClassList] = useState<ClassInviteRecord[]>([]);

  useEffect(() => {
    apiClient.get<{ inviteMessage: ClassInviteRecord[] }>(`/api/class/${_id}/invite/message`).then(({ data }) => {
      setClassList(data.inviteMessage);
    });
  }, [_id]);

  return (
    <InviteMessageBoxContianer>
      {classLists.length > 0 ? (
        <>
        {classLists.map((v) => {
          return (
            <Link to={`/pages/class/${v.info?._id ?? ''}`} key={v._id}>
              <InviteMessageListWrap>
                <ListtHumbnail src={v.info?.thumnail} width="16%" />
                <ListInfoWrap width="80%" ml="16px" jc="center">
                    <InfoMainTitle>{v.info?.className}</InfoMainTitle>
                    <InfoHasTagWrap mt="4px">
                      <InfoMainHasTag>{v.info?.category}</InfoMainHasTag>
                      {v.info?.hashTag?.map((v, i) => {
                        return <InfoHasTag key={i}>#{v}</InfoHasTag>;
                      })}
                    </InfoHasTagWrap>
                    <InviteMessageTimeWrap>
                      <MdOutlineLocalPostOffice size="15px" />
                      <InviteMessageDay>{format(parseISO(v.createdTime ?? new Date().toISOString()), 'MM월 dd일')}</InviteMessageDay>
                      <InviteMessageTime>
                        {`${new Date(v.createdTime ?? new Date().toISOString()).getHours() >= 12 ? '오후' : '오전'} ${format(
                          parseISO(v.createdTime ?? new Date().toISOString()),
                          'hh시 mm분',
                        )}`}
                      </InviteMessageTime>
                    </InviteMessageTimeWrap>
                  </ListInfoWrap>
                  <InfoLocation al="flex-start">
                    <InfoLocationWrap>
                      <GrLocation />
                      {v.info?.location?.split(' ')[1]}
                    </InfoLocationWrap>
                  </InfoLocation>
                </InviteMessageListWrap>
              </Link>
            );
          })}
        </>
      ) : (
        <InvitedNotMessage>초대받은 모임이 없습니다.</InvitedNotMessage>
      )}
    </InviteMessageBoxContianer>
  );
};

export default InviteMessageBox;
