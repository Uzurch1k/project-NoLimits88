import css from './MonthInfo.module.scss';

import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';

const MonthInfo = () => {
  return (
    <div className={css.monthInfo}>
      <div className={css.calendarPaginationWrapper}>
        <h3 className={css.monthTitle}>Month</h3>
        <CalendarPagination />
      </div>
      <Calendar />
    </div>
  );
};

export default MonthInfo;
