import clsx from 'clsx';
import css from './CalendarItem.module.scss';

const CalendarItem = ({ day, percent }) => {
  return (
    <div className={css.btnDayWrapper}>
      <button
        className={clsx({
          [css.btn100Percent]: true,
          [css.btnNot100Percent]: percent < 100,
        })}
      >
        <span className={css.day}>{day}</span>
      </button>
      <span className={css.percent}>{percent}%</span>
    </div>
  );
};

export default CalendarItem;
