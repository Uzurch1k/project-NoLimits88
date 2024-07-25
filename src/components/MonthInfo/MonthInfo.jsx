import css from './MonthInfo.module.scss';

import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';

const MonthInfo = () => {
  return (
    <div className={css.monthInfo}>
      <div className={css.calendarPaginationWrapper}>
        <h2 className={css.monthTitle}>Month</h2>
        <CalendarPagination />
      </div>
      <Calendar />
    </div>
  );
};

export default MonthInfo;
