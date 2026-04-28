import { format, parseISO } from 'date-fns';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import type { ClassMeetingRecord } from '@/types/domain/class';

type Props = {
  myMeetinsList: ClassMeetingRecord[];
  setMeetingDayValue: (value: Date | null) => void;
  meetingDayValue: Date | null;
};

function Calendars({ myMeetinsList, setMeetingDayValue, meetingDayValue }: Props) {
  return (
    <div>
      <Calendar
        onChange={setMeetingDayValue}
        value={meetingDayValue}
        tileClassName={({ date }: { date: Date }) => {
          if (myMeetinsList.find((x) => format(parseISO(String(x.day)), 'dd-MM-yyyy') === format(date, 'dd-MM-yyyy'))) {
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
