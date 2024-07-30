import clsx from 'clsx';
import css from './CalendarItem.module.scss';
import { useDispatch } from 'react-redux';
import { fetchAllWaterRecordsOfDay } from '../../redux/water/operations';

const CalendarItem = ({ day, percent, date, isSelected }) => {
  const dispatch = useDispatch();

  const selectedDate = new Date(date);
  const today = new Date();

  const handleOnClick = () => {
    if (selectedDate > today) {
      return;
    }
    dispatch(fetchAllWaterRecordsOfDay(date));
  };

  return (
    <li className={css.calendarItem}>
      <div className={css.btnDayWrapper}>
        <button
          className={clsx({
            [css.btn100Percent]: true,
            [css.btnNot100Percent]: percent < 100,
            [css.btnDisabled]: selectedDate > today,
            [css.btnSelectedDate]: isSelected,
          })}
          onClick={handleOnClick}
        >
          <span className={css.day}>{day}</span>
        </button>
        <span className={css.percent}>{percent}%</span>
      </div>
    </li>
  );
};

export default CalendarItem;
