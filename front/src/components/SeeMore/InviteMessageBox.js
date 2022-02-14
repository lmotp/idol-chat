import React, { useEffect, useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdOutlineLocalPostOffice } from 'react-icons/md';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

const InviteMessageBoxContianer = styled.ul`
  height: 52vh;
  overflow-y: scroll;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const ListtHumbnail = styled.div`
  width: ${(props) => props.width || '40%'};
  height: auto;
  border-radius: 10px;
  background: ${(props) => (props.src ? 'url(' + props.src + ')' : 'white')} center no-repeat;
  background-size: cover;
  border: ${(props) => !props.src && '1px solid rgb(180,180,180)'};
  border-style: ${(props) => !props.src && 'dashed'};
  order: ${(props) => props.order || '0'};
`;

const ListInfoWrap = styled.div`
  width: ${(props) => props.width || '46%'};
  margin-left: ${(props) => props.ml || '-12px'};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.jc || 'space-between'};
  align-items: ${(props) => props.al || 'flex-start'};
  order: ${(props) => props.order || '0'};
`;

const InfoMainTitle = styled.h2`
  font-weight: bold;
  font-size: 30px;
`;

const InfoHasTagWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.mt || '0'};
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

const InfoLocation = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: ${(props) => props.mb || '0'};
  align-self: ${(props) => props.al || 'auto'};
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
  const { _id } = useSelector((state) => state.userCheckReducers.result);
  const [classLists, setClassList] = useState([]);

  useEffect(() => {
    axios.get(`/api/class/${_id}/invite/message`).then(({ data }) => {
      setClassList(data.inviteMessage);
    });
  }, [_id]);

  console.log(classLists);

  return (
    <InviteMessageBoxContianer>
      {classLists.length > 0 ? (
        <>
          {classLists.map((v) => {
            return (
              <Link to={`/pages/class/${v.info?._id}`}>
                <InviteMessageListWrap key={v._id}>
                  <ListtHumbnail src={v.info.thumnail} width="16%" />
                  <ListInfoWrap width="80%" ml="16px" jc="center">
                    <InfoMainTitle>{v.info.className}</InfoMainTitle>
                    <InfoHasTagWrap mt="4px">
                      <InfoMainHasTag>{v.info.category}</InfoMainHasTag>
                      {v.info.hashTag.map((v, i) => {
                        return <InfoHasTag key={i}>#{v}</InfoHasTag>;
                      })}
                    </InfoHasTagWrap>
                    <InviteMessageTimeWrap>
                      <MdOutlineLocalPostOffice size="15px" />
                      <InviteMessageDay>{format(parseISO(v.createdTime), 'MM월 dd일')}</InviteMessageDay>
                      <InviteMessageTime>
                        {format(parseISO(v.createdTime), `${'a' !== 'PM' ? '오후' : '오전'} hh시 mm분`)}
                      </InviteMessageTime>
                    </InviteMessageTimeWrap>
                  </ListInfoWrap>
                  <InfoLocation al="flex-start">
                    <InfoLocationWrap>
                      <GrLocation />
                      {v.info.location.split(' ')[1]}
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
