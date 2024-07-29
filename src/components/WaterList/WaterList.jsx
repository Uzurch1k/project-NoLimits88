import css from './WaterList.module.scss';

import WaterItem from '../WaterItem/WaterItem';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedDate,
  selectWaterRecordsOfDay,
} from '../../redux/water/selectors';
import { useEffect } from 'react';
import { fetchAllWaterRecordsOfDay } from '../../redux/water/operations';

const WaterList = ({ openEditWaterModal, openDeleteWaterModal }) => {
  const selectedDate = useSelector(selectSelectedDate);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('here');
    dispatch(fetchAllWaterRecordsOfDay(selectedDate));
  }, [dispatch, selectedDate]);

  const waterDailyRecords = useSelector(selectWaterRecordsOfDay);
  return (
    <div className={css.waterListSec}>
      <div className={css.waterListbody}>
        <ul className={css.waterList}>
          {/* <WaterItem
            openEditWaterModal={openEditWaterModal}
            openDeleteWaterModal={openDeleteWaterModal}
          /> */}
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
