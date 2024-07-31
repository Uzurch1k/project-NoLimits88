import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { subDays, addDays, format} from 'date-fns';
import { useSelector } from 'react-redux';
import {
  selectWaterRecordsOfMonth,
  selectSelectedDay,
} from '../../redux/water/selectors';
import css from './CalendarChart.module.scss';

const CalendarChart = () => {
  const monthData = useSelector(selectWaterRecordsOfMonth);
  const dayOfMonth = useSelector(selectSelectedDay);
  
  const selectedDay = new Date(dayOfMonth);
  const start = subDays(selectedDay, 6);
  const end = selectedDay;
  const weekDays = [];

  for (let day = start; day <= end; day = addDays(day, 1)) {
    weekDays.push(day);
  }


  const weeklyData = weekDays.map(day => {
    const formattedDay = format(day, 'yyyy-MM-dd');

    const getDayData = monthData.filter(
      data => format(new Date(data.date), 'yyyy-MM-dd') === formattedDay
    );
    const totalAmount = getDayData.reduce(
      (total, record) => total + record.amount,
      0
    );

    return {
      key: formattedDay,
      day: format(day, 'dd'),
      amountWaterOfDay: totalAmount,
    };
  });



  console.log('Weekly Data:', weeklyData);

  const renderDot = props => {
    const { cx, cy, key } = props;
    return (
      <g key={key}>
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill="var(--cw)"
          stroke="var(--cn)"
          strokeWidth={3}
        />
      </g>
    );
    };

    const tooltipContent = ({ payload }) => {
      if (payload.length === 0) return null;

      const value = payload[0].value * 1000;

      return (
          <div className={css.tooltipContainer}>
          <p className="tooltip-text">{`${value} ml`}</p>
        </div>
      );
    };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={weeklyData} margin={{ left: -5, right: 7 }}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ dx: 0, dy: 0, fill: 'var(--cb)', className: css.axisTick }}
          />
          <YAxis
            dataKey="amountWaterOfDay"
            tickFormatter={value => {
              if (value === 0) {
                return `${value}%`;
              }
              if (value % 1 === 0) {
                return `${value} L`;
              }
              return `${value.toFixed(1)} L`;
            }}
            axisLine={false}
            tickLine={false}
            padding={{ bottom: 20, top: 27 }}
            tick={{
              dx: -45,
              dy: 0,
              fill: 'var(--cb)',
              textAnchor: 'start',
              className: 'axis-tick',
            }}
          />
          <Tooltip
            content={tooltipContent}
            cursor={false}
          />
          <Area
            dataKey="amountWaterOfDay"
            stroke="var(--cn)"
            strokeWidth={3}
            fill="url(#colorUv)"
            dot={renderDot}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--cg)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--cg)" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CalendarChart;
