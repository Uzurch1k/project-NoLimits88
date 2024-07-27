import css from './CalendarPagination.module.scss';
import icons from '../../img/icons/symbol.svg';
import { format, addMonths, subMonths, startOfMonth } from 'date-fns';

const CalendarPagination = ({ currentDate, setCurrentDate }) => {
  const minDate = new Date('2024-01-01');
  const normalisedDate = startOfMonth(currentDate);

  const handlePrevMonth = () => {
    const newMonth = subMonths(normalisedDate, 1);
    if (newMonth >= startOfMonth(minDate)) {
      setCurrentDate(newMonth);
    }
  };


  const handleNextMonth = () => {
    if (normalisedDate < new Date()) {
      const newMonth = addMonths(normalisedDate, 1);
      setCurrentDate(newMonth);
    }
    
  };

  const isPrevDisabled = normalisedDate <= startOfMonth(minDate); 
  const isNextDisabled = normalisedDate >= new Date();

  return (
    <div className={css.paginationWrapper}>
      <div className={css.chooseMonthWrapper}>
        <button
          className={css.previousMonthBtn}
          disabled={isPrevDisabled}
          onClick={handlePrevMonth}
        >
          <svg
            width="18"
            height="18"
            className={css.calendarArrowIconLeft}
          >
            <use href={`${icons}#icon-arrow-left`}></use>
          </svg>
        </button>
        <p className={css.dateTitle}>{format(currentDate, 'MMMM, yyyy')}</p>
        <button
          className={css.nextMonthBtn}
          onClick={handleNextMonth}
          disabled={isNextDisabled}
        >
          <svg
            width="18"
            height="18"
            className={css.calendarArrowIconRight}
          >
            <use href={`${icons}#icon-arrow-right`}></use>
          </svg>
        </button>
      </div>
      <button className={css.statisticsButton}>
        <svg width="20" height="20" className={css.iconStatistics}>
          <use href={`${icons}#icon-pie-chart`} />
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;
