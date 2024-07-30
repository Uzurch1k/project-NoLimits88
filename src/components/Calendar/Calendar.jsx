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
import {
  fetchAllWaterRecordsOfMonth,
  fetchAllWaterRecordsOfDay,
} from '../../redux/water/operations';
import { convertDateToIso } from '../../helpers/convertDateToIso';
import { selectUser } from '../../redux/auth/selectors';
import {
  selectSelectedMonth,
  selectWaterRecordsOfMonth,
  selectSelectedDay,
} from '../../redux/water/selectors';
import { setSelectedDay } from '../../redux/water/slice';

const Calendar = ({ currentDate }) => {
  const selectedDay = useSelector(selectSelectedDay);
  const selectedMonth = useSelector(selectSelectedMonth);
  const allRecordsOfMonth = useSelector(selectWaterRecordsOfMonth);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const startDate = startOfMonth(new Date(currentDate));
  const endDate = endOfMonth(new Date(currentDate));

  const month = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  useEffect(() => {
    dispatch(fetchAllWaterRecordsOfMonth(selectedMonth));
  }, [dispatch, selectedMonth]);

  useEffect(() => {
    if (selectedDay) {
      dispatch(fetchAllWaterRecordsOfDay(selectedDay));
    }
  }, [dispatch, selectedDay]);

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

  const handleDayClick = day => {
    const isoDate = convertDateToIso(day);
    dispatch(setSelectedDay(isoDate));
  };

  return (
    <ul className={css.calendarWrapper}>
      {month.map(item => (
        <CalendarItem
          key={item}
          day={item.getDate()}
          percent={calculatePercent(item)}
          date={convertDateToIso(item)}
          onClick={() => handleDayClick(item)} 
          isSelected={convertDateToIso(item) === selectedDay}
        />
      ))}
    </ul>
  );
};

export default Calendar;
