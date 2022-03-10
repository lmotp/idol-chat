import React, { memo, useCallback, useState } from 'react';
import Modal from '../Modal/Modal';
import MeetingMakeModal from '../Modal/MeetingMakeModal';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { AiOutlineCalendar, AiOutlineClose } from 'react-icons/ai';
import { BiWon } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import styled from 'styled-components';
import { AuthButton } from '../../css/FormStyle';
import { Hr } from '../../css/SelectBoxStyle';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { useEffect } from 'react';
import { classJoin } from '../../modules/actions/ClassJoinAction';
import { useDispatch } from 'react-redux';
import { ModifyButton } from '../../css/ModifyStyle';

const ClassMeetingContainer = styled.div`
  margin-bottom: 33px;
`;

const ClassMeetingInfoWrap = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const ClassMeetingTitle = styled.h3`
  margin-bottom: 16px;
`;

const ClassNotMeetingDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClassMeetingDay = styled.div`
  font-size: 14px;
`;

const MeetingInfoWrap = styled.div`
  width: 100%;
  margin-bottom: 14px;
  border-bottom: 1px solid rgb(200, 200, 200);
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;
const MeetingInfoThumnail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid rgb(200, 200, 200);
  width: 8%;
  border-radius: 4px;
`;

const MeetingInfoDay = styled.div`
  font-size: 14px;
`;
const MeetingInfoDate = styled.div`
  font-weight: bold;
  font-size: 21px;
`;

const MeetingInfoTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #6667ab;
`;

const MeetingInfo = styled.div`
  width: 80%;
`;

const MeetingInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MeetingRightWrap = styled.div`
  width: 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MeetingAtendButton = styled.button`
  width: 100%;
  height: 36px;
  color: white;
  border-radius: 6px;
  background-color: #8dbad0;
  cursor: ${(props) => (props.joinState ? 'pointer' : 'auto')};
  opacity: ${(props) => (props.joinState ? 1 : 0)};
  padding: 0 4px;
`;

const MemberCount = styled.div`
  font-size: 14px;
  color: gray;
`;

const PlusButton = styled.div`
  display: flex;
  margin-right: 4px;
`;

const ErrorMesage = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(200, 200, 200);
  font-weight: 700;
  font-size: 18px;
`;

const ErrorButton = styled(ModifyButton)`
  position: relative;
  transform: translateX(-50%);
  left: 50%;
  margin: 20px 0;
`;

const MeetingDeleteButton = styled(AiOutlineClose)`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  color: rgb(150, 150, 150);
`;

const dayArray = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const ClassMeeting = ({ admin, userId, classId, joinState, setMeetingList, meetingList }) => {
  const [modalState, setModalState] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const ModalOpen = () => {
    if (meetingList.length === 3) {
      return setErrorModal(true);
    }

    setModalState(true);
  };

  const ErrorModalClose = () => {
    setErrorModal(false);
  };

  const ModalClose = () => {
    setModalState(false);
  };

  //정모 만들었을때 다시 받아오는 API
  useEffect(() => {
    if (loading) {
      axios.get(`/api/meeting/list/${classId}`).then(({ data }) => {
        setMeetingList(data);
        setLoading(false);
      });
    }
  }, [loading, classId, setMeetingList]);

  const meetingAttend = (_id) => {
    axios.post('/api/meeting/attend', { userId, classId, _id }).then(() => {
      setLoading(true);
    });
  };

  // 모임에 가입했을때 리렌더링해주는 API
  const classJoinFunc = useCallback(() => {
    dispatch(classJoin());
    axios.post(`/api/class/info/join/member`, { userId, classId }).then(() => {
      dispatch(classJoin());
    });
  }, [userId, classId, dispatch]);

  const DeleteMeetingFunc = (_id) => {
    const question = window.confirm('정말 삭제하시겠습니까?');

    if (question) {
      axios.post('/api/meeting/delete', { classId, _id }).then((data) => {
        console.log('성공!');
        setLoading(true);
      });
    }
  };

  return (
    <ClassMeetingContainer>
      <ClassMeetingTitle>모임 정모</ClassMeetingTitle>

      {meetingList?.length > 0 ? (
        <ClassMeetingDay>
          {meetingList.map((v, i) => {
            return (
              <ClassMeetingInfoWrap key={i}>
                <MeetingInfoTitle>{v.name}</MeetingInfoTitle>
                <MeetingInfoWrap>
                  <MeetingInfoThumnail>
                    <MeetingInfoDay>{dayArray[parseISO(v.day).getDay()]}</MeetingInfoDay>
                    <MeetingInfoDate>
                      {format(parseISO(v.day), 'dd') - format(new Date(), 'dd') === 0
                        ? '오늘'
                        : format(parseISO(v.day), 'dd') - format(new Date(), 'dd') === 1
                        ? '내일'
                        : format(parseISO(v.day), 'dd') - format(new Date(), 'dd') === 2
                        ? '모레'
                        : format(parseISO(v.day), 'dd')}
                    </MeetingInfoDate>
                  </MeetingInfoThumnail>
                  <MeetingInfo>
                    <MeetingInfoItem>
                      <AiOutlineCalendar size="16px" style={{ marginRight: '4px' }} />
                      {format(parseISO(v.day), 'MM월 dd일 ')}
                      {dayArray[parseISO(v.day).getDay()]}
                      {`${v.time.split(':')[0] > 12 ? ' 오후' : ' 오전'} ${v.time}`}
                    </MeetingInfoItem>
                    <MeetingInfoItem>
                      <GrLocation size="16px" style={{ marginRight: '4px' }} />
                      {v.place}
                    </MeetingInfoItem>
                    <MeetingInfoItem>
                      <BiWon size="16px" style={{ marginRight: '4px' }} />
                      {v.price}
                    </MeetingInfoItem>
                  </MeetingInfo>
                  <MeetingRightWrap>
                    <MeetingAtendButton
                      onClick={() => meetingAttend(v._id)}
                      disabled={!joinState}
                      joinState={joinState}
                    >
                      {v.attendMember.includes(userId) ? '참석완료' : '참석하기'}
                    </MeetingAtendButton>
                    <MemberCount>{v.attendMember.length} / 20</MemberCount>
                    {admin && <MeetingDeleteButton onClick={() => DeleteMeetingFunc(v._id)} />}
                  </MeetingRightWrap>
                </MeetingInfoWrap>
              </ClassMeetingInfoWrap>
            );
          })}
        </ClassMeetingDay>
      ) : (
        <ClassNotMeetingDay>
          <AiOutlineCalendar size="18px" style={{ marginRight: '4px' }} />
          현재 정모가 없습니다.
        </ClassNotMeetingDay>
      )}

      {admin ? (
        <AuthButton color="rgb(180,180,180)" onClick={ModalOpen} margin="30px 0 ">
          <PlusButton>
            <BsPlusCircleDotted />
          </PlusButton>
          정모 만들기
        </AuthButton>
      ) : joinState ? null : (
        <AuthButton onClick={classJoinFunc} color="#00acee" margin="30px 0 20px">
          가입하기
        </AuthButton>
      )}
      <Hr style={{ marginTop: joinState ? '20px' : '0' }} />
      <Modal modalState={modalState}>
        <MeetingMakeModal
          classId={classId}
          ModalClose={ModalClose}
          setLoading={setLoading}
          meetingListLength={meetingList.length}
        />
      </Modal>

      <Modal errorModal={errorModal}>
        <ErrorMesage>모임은 3개까지만 만들 수 있습니다!</ErrorMesage>
        <ErrorButton onClick={ErrorModalClose}>취소</ErrorButton>
      </Modal>
    </ClassMeetingContainer>
  );
};

export default memo(ClassMeeting);
