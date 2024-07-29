import css from './CalendarPagination.module.scss';
import icons from '../../img/icons/symbol.svg';
import { format, addMonths, subMonths, startOfMonth } from 'date-fns';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

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
          <svg width="18" height="18" className={css.calendarArrowIconLeft}>
            <use href={`${icons}#icon-arrow-left`}></use>
          </svg>
        </button>
        <div className={css.dateTitleBox}>
          <SwitchTransition>
            <CSSTransition
              key={format(currentDate, 'MMM-yyyy')}
              timeout={200}
              classNames={{
                enter: css.dateTitleEnter,
                enterActive: css.dateTitleEnterActive,
                exit: css.dateTitleExit,
                exitActive: css.dateTitleExitActive,
              }}
            >
              <div className={css.dateTitle}>
                <p>{format(currentDate, 'MMM,')}</p>
                <p>{format(currentDate, 'yyyy')}</p>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <button
          className={css.nextMonthBtn}
          onClick={handleNextMonth}
          disabled={isNextDisabled}
        >
          <svg width="18" height="18" className={css.calendarArrowIconRight}>
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
