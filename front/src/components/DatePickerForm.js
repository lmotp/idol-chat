import React from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { SignUpItemBox } from '../css/FormStyle';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerForm = ({ startDate, changeDatePicker }) => {
  return (
    <SignUpItemBox>
      <DatePicker selected={startDate} onChange={changeDatePicker} locale={ko} dateFormat="yyyy년 MM월 dd일" />
    </SignUpItemBox>
  );
};

export default DatePickerForm;
