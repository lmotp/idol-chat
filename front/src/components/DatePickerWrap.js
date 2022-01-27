import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const SDatePicker = styled(DatePicker)`
  border-radius: 4px;
  padding: 7px 10px !important;
  width: 100%;
  outline: none;
  border: 1px solid rgb(200, 200, 200);
  cursor: pointer;
`;

const DatePickerWrap = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <SDatePicker
      dateFormat="yyyy년 MM월 dd일"
      selected={startDate}
      minDate={new Date()}
      onChange={(date) => setStartDate(date)}
      locale={ko}
      showPreviousMonths={true}
    />
  );
};

export default DatePickerWrap;
