import css from './CalendarPagination.module.scss';
import icons from '../../img/icons/icons.svg';

const CalendarPagination = () => {
  return (
    <div className={css.paginationWrapper}>
      <div className={css.chooseMonthWrapper}>
        <button className={css.previousMonthBtn}>
          <svg width="18" height="18" className={css.calendarArrowIconLeft}>
            <use href={`${icons}#calendar-arrow-left`}></use>
          </svg>
        </button>
        <p className={css.dateTitle}>Some date</p>
        <button className={css.nextMonthBtn}>
          <svg width="18" height="18" className={css.calendarArrowIconRight}>
            <use href={`${icons}#calendar-arrow-right`}></use>
          </svg>
        </button>
      </div>
      <button className={css.statisticsButton}>
        <svg width="20" height="20" className={css.iconStatistics}>
          <use href={`${icons}#statistics`} />
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;
