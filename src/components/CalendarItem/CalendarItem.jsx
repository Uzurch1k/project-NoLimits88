import clsx from 'clsx';
import css from './CalendarItem.module.scss';
import { useDispatch } from 'react-redux';
import { fetchAllWaterRecordsOfDay } from '../../redux/water/operations';

const CalendarItem = ({ day, percent, date }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    const selectedDate = new Date(date);
    const today = new Date();

    if (selectedDate > today) {
      alert("Can't get water from the future.");
      return;
    }

    dispatch(fetchAllWaterRecordsOfDay(date));
  };

  return (
    <div className={css.btnDayWrapper}>
      <button
        className={clsx({
          [css.btn100Percent]: true,
          [css.btnNot100Percent]: percent < 100,
        })}
        onClick={handleOnClick}
      >
        <span className={css.day}>{day}</span>
      </button>
      <span className={css.percent}>{percent}%</span>
    </div>
  );
};

export default CalendarItem;
