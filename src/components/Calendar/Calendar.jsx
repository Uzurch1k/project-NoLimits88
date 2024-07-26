import css from './Calendar.module.scss';

import CalendarItem from '../CalendarItem/CalendarItem';

const Calendar = () => {
  const month = [
    { day: 1, percent: 100 },
    { day: 2, percent: 80 },
    { day: 3, percent: 100 },
    { day: 4, percent: 100 },
    { day: 5, percent: 100 },
    { day: 6, percent: 70 },
    { day: 7, percent: 50 },
    { day: 8, percent: 100 },
    { day: 9, percent: 100 },
    { day: 10, percent: 100 },
    { day: 11, percent: 100 },
    { day: 12, percent: 100 },
    { day: 13, percent: 90 },
    { day: 14, percent: 100 },
    { day: 15, percent: 100 },
    { day: 16, percent: 100 },
    { day: 17, percent: 100 },
    { day: 18, percent: 40 },
    { day: 19, percent: 100 },
    { day: 20, percent: 100 },
    { day: 21, percent: 50 },
    { day: 22, percent: 100 },
    { day: 23, percent: 100 },
    { day: 24, percent: 100 },
    { day: 25, percent: 90 },
    { day: 26, percent: 100 },
    { day: 27, percent: 50 },
    { day: 28, percent: 50 },
    { day: 29, percent: 100 },
    { day: 30, percent: 100 },
  ];

  return (
    <ul className={css.calendarWrapper}>
      {month.map(dayData => (
        <li key={dayData.day} className={css.calendarItem}>
          <CalendarItem day={dayData.day} percent={dayData.percent} />
        </li>
      ))}
    </ul>
  );
};

export default Calendar;
