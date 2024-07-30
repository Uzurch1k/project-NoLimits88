import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWaterRecordsOfDay } from '../../redux/water/operations';
import { selectSelectedDay } from '../../redux/water/selectors';
import { isToday } from 'date-fns';

import clsx from 'clsx';
import css from './CalendarItem.module.scss';

const CalendarItem = ({ day, percent, date, isSelected }) => {
  const dispatch = useDispatch();

  const selectedDay = useSelector(selectSelectedDay);

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
            [css.btnSelectedDate]:
              (isToday(date) && isToday(selectedDay)) || isSelected,
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
