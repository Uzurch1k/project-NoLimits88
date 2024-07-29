import css from './Calendar.module.scss';

import CalendarItem from '../CalendarItem/CalendarItem';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWaterRecordsOfMonth } from '../../redux/water/operations';

import { convertDateToIso } from '../../helpers/convertDateToIso';
import { selectSelectedDate } from '../../redux/water/selectors';

const Calendar = ({ currentDate }) => {
  const startDate = startOfMonth(new Date(currentDate));
  const endDate = endOfMonth(new Date(currentDate));

  const month = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const generateRandomPercent = () => Math.floor(Math.random() * 100);

  // const selectedDate = useSelector(selectSelectedDate);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchAllWaterRecordsOfMonth(selectedDate));
  // }, [dispatch, selectedDate]);

  return (
    <ul className={css.calendarWrapper}>
      {month.map((day, index) => (
        <li key={day} className={css.calendarItem}>
          <CalendarItem
            day={day.getDate()}
            percent={generateRandomPercent()}
            date={convertDateToIso(month[index])}
          />
        </li>
      ))}
    </ul>
  );
};

export default Calendar;
