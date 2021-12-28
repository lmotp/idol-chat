import React from 'react';
import { getDay } from 'date-fns';
import { Calendar } from 'react-date-range';
import { useSelector } from 'react-redux';
import { ko } from 'react-date-range/src/locale';
import 'react-date-range/dist/styles.css'; // 메인 스타일 파일
import 'react-date-range/dist/theme/default.css'; // 테마 CSS 파일

const Calendars = ({ date, setDate, setFnsDay }) => {
  const schedule = useSelector((state) => state.calendarReducer);
  console.log(schedule);

  const handleSelect = (date) => {
    setDate(date);
    setFnsDay(getDay(date));
  };

  return (
    <Calendar
      moveRangeOnFirstSelection="false"
      date={date}
      onChange={handleSelect}
      direction="horizontal"
      locale={ko}
    />
  );
};

export default Calendars;
