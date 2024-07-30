import css from './Calendar.module.scss';
import CalendarItem from '../CalendarItem/CalendarItem';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWaterRecordsOfMonth } from '../../redux/water/operations';
import { convertDateToIso } from '../../helpers/convertDateToIso';
import { selectUser } from '../../redux/auth/selectors';
import {
  selectSelectedDay,
  selectSelectedMonth,
  selectWaterRecordsOfMonth,
} from '../../redux/water/selectors';

const Calendar = ({ currentDate }) => {
  const dispatch = useDispatch();

  const selectedMonth = useSelector(selectSelectedMonth);
  const allRecordsOfMonth = useSelector(selectWaterRecordsOfMonth);
  const user = useSelector(selectUser);
  const waterOfDay = useSelector(selectSelectedDay);

  const startDate = startOfMonth(new Date(currentDate));
  const endDate = endOfMonth(new Date(currentDate));

  const month = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  useEffect(() => {
    dispatch(fetchAllWaterRecordsOfMonth(selectedMonth));
  }, [dispatch, selectedMonth]);

  const getDayData = day => {
    return allRecordsOfMonth.filter(record => {
      const recordDate = new Date(record.date);
      return isSameDay(day, recordDate);
    });
  };

  const calculatePercent = day => {
    const records = getDayData(day);
    const dailyGoal = user.amountOfWater;
    const totalAmount = records.reduce(
      (total, record) => total + record.amount,
      0
    );
    return dailyGoal ? Math.round((totalAmount / dailyGoal) * 100) : 0;
  };

  return (
    <ul className={css.calendarWrapper}>
      {month.map(item => (
        <CalendarItem
          key={item}
          day={item.getDate()}
          percent={calculatePercent(item)}
          date={convertDateToIso(item)}
          isSelected={convertDateToIso(item) === waterOfDay}
        />
      ))}
    </ul>
  );
};

export default Calendar;
