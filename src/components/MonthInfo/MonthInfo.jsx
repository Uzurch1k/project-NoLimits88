import css from './MonthInfo.module.scss';

import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import { useState } from 'react';
import CalendarChart from '../CalendarChart/CalendarChart';

const MonthInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showStatistics, setShowStatistics] = useState(false);

  return (
    <div className={css.monthInfo}>
      <div className={css.calendarPaginationWrapper}>
        <h2 className={css.monthTitle}>
          {showStatistics ? 'Statistics' : 'Month'}
        </h2>
        <CalendarPagination
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setShowStatistics={setShowStatistics}
        />
      </div>
      {showStatistics ? (
        <CalendarChart />
      ) : (
        <Calendar currentDate={currentDate} />
      )}
    </div>
  );
};

export default MonthInfo;
