import React, { useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';

const SDatePicker = styled(DatePicker as unknown as React.ComponentType<any>)`
  border-radius: 4px;
  padding: 7px 10px !important;
  width: 100%;
  outline: none;
  border: 1px solid rgb(200, 200, 200);
  cursor: pointer;
  // display: ${(props) => (props.on ? 'none' : 'block')};
`;

type Props = {
  meetingDayValue: Date | null;
  setMeetingDayValue: (value: Date | null) => void;
  on?: boolean;
};

const DatePickerWrap = ({ meetingDayValue, setMeetingDayValue, on }: Props) => {
  const calendarRef = useRef<{ setOpen: (value: boolean) => void } | null>(null);

  useEffect(() => {
    if (on) {
      calendarRef.current?.setOpen(true);
    }
  }, [on]);
  return (
    <SDatePicker
      dateFormat="MM월 dd일 eee요일"
      selected={meetingDayValue}
      minDate={new Date()}
      onChange={(date: Date | null) => setMeetingDayValue(date)}
      locale={ko}
      showPreviousMonths={true}
      on={on}
      ref={calendarRef}
      shouldCloseOnSelect={true}
    />
  );
};

export default DatePickerWrap;
