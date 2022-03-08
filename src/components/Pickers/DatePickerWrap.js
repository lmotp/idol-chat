import React, { useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const SDatePicker = styled(DatePicker)`
  border-radius: 4px;
  padding: 7px 10px !important;
  width: 100%;
  outline: none;
  border: 1px solid rgb(200, 200, 200);
  cursor: pointer;
  // display: ${(props) => (props.on ? 'none' : 'block')};
`;

const DatePickerWrap = ({ meetingDayValue, setMeetingDayValue, on }) => {
  const calendarRef = useRef();

  useEffect(() => {
    if (on) {
      calendarRef.current.setOpen(true);
    }
  }, [on]);
  return (
    <SDatePicker
      dateFormat="MM월 dd일 eee요일"
      selected={meetingDayValue}
      minDate={new Date()}
      onChange={(date) => setMeetingDayValue(date)}
      locale={ko}
      showPreviousMonths={true}
      on={on}
      ref={calendarRef}
      shouldCloseOnSelect={true}
    />
  );
};

export default DatePickerWrap;
