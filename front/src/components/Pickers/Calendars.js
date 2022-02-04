import { format } from 'date-fns';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendars() {
  const [value, onChange] = useState(new Date());

  console.log(value);

  const mark = ['04-03-2020', '03-03-2020', '05-03-2020'];

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {
          if (mark.find((x) => x === format(date, 'DD-MM-YYYY'))) {
            return 'highlight';
          }
        }}
      />
    </div>
  );
}

export default Calendars;
