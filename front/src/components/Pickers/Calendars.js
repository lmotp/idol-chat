import { format } from 'date-fns';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendars({ myMeetinsList }) {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {
          if (myMeetinsList.find((x) => x === format(date, 'dd-MM-yyyy'))) {
            console.log(
              myMeetinsList.find((x) => x === format(date, 'dd-MM-yyyy')),
              '안녕?',
            );
            return 'highlight';
          }
        }}
      />
    </div>
  );
}

export default Calendars;
