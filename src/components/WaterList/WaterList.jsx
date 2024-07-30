import css from './WaterList.module.scss';

import WaterItem from '../WaterItem/WaterItem';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedDay,
  selectWaterRecordsOfDay,
} from '../../redux/water/selectors';
import { fetchAllWaterRecordsOfDay } from '../../redux/water/operations';

const WaterList = ({ openEditWaterModal, openDeleteWaterModal }) => {
  const selectedDay = useSelector(selectSelectedDay);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllWaterRecordsOfDay(selectedDay));
  }, [selectedDay, dispatch]);

  const waterDailyRecords = useSelector(selectWaterRecordsOfDay);

  return (
    <div className={css.waterListSec}>
      <div className={css.waterListbody}>
        <ul className={css.waterList}>
          {waterDailyRecords.map((record, index) => (
            <WaterItem
              key={index}
              openEditWaterModal={openEditWaterModal}
              openDeleteWaterModal={openDeleteWaterModal}
              date={record.date}
              amount={record.amount}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WaterList;
