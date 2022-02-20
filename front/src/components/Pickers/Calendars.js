import { format, parseISO } from 'date-fns';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendars({ myMeetinsList, setMeetingDayValue, meetingDayValue }) {
  return (
    <div>
      <Calendar
        onChange={setMeetingDayValue}
        value={meetingDayValue}
        tileClassName={({ date, view }) => {
          if (myMeetinsList.find((x) => format(parseISO(x.day), 'dd-MM-yyyy') === format(date, 'dd-MM-yyyy'))) {
            return 'highlight';
          }
        }}
        locale="ko"
        dateFormat="yyyy.MM.dd(eee)"
        showFixedNumberOfWeeks={true}
      />
    </div>
  );
}

export default Calendars;
