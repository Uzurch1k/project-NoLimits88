import css from './MonthInfo.module.scss';

import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import { useState } from 'react';

const MonthInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className={css.monthInfo}>
      <div className={css.calendarPaginationWrapper}>
        <h2 className={css.monthTitle}>Month</h2>
        <CalendarPagination
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>
      <Calendar currentDate={currentDate} />
    </div>
  );
};

export default MonthInfo;
