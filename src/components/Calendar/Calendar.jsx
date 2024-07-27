import css from './Calendar.module.scss';

import CalendarItem from '../CalendarItem/CalendarItem';
import { startOfMonth, endOfMonth, eachDayOfInterval} from 'date-fns';

const Calendar = ({ currentDate }) => {

  const startDate = startOfMonth(new Date(currentDate));
  const endDate = endOfMonth(new Date(currentDate));

  const month = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const generateRandomPercent = () => Math.floor(Math.random() * 100);

  return (
    <ul className={css.calendarWrapper}>
      {month.map(day => (
        <li key={day} className={css.calendarItem}>
          <CalendarItem
            day={day.getDate()}
            percent={generateRandomPercent()} 
          />
        </li>
      ))}
    </ul>
  );
};

export default Calendar;
