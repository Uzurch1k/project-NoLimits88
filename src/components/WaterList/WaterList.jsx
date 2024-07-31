import css from './WaterList.module.scss';

import WaterItem from '../WaterItem/WaterItem';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedDay,
  selectWaterRecordsOfDay,
} from '../../redux/water/selectors';
import { fetchAllWaterRecordsOfDay } from '../../redux/water/operations';

const WaterList = ({
  openEditWaterModal,
  openDeleteWaterModal,
  setIdWaterItem,
}) => {
  const { t } = useTranslation();
  const selectedDay = useSelector(selectSelectedDay);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDay === null) return;
    dispatch(fetchAllWaterRecordsOfDay(selectedDay));
  }, [selectedDay, dispatch]);

  const waterDailyRecords = useSelector(selectWaterRecordsOfDay);

  return (
    <div className={css.waterListSec}>
      {waterDailyRecords.length !== 0 ? (
        <div className={css.waterListbody}>
          <ul className={css.waterList}>
            {waterDailyRecords.map(item => (
              <WaterItem
                key={item._id}
                openEditWaterModal={openEditWaterModal}
                openDeleteWaterModal={openDeleteWaterModal}
                searchWaterItem={item}
                setIdWaterItem={setIdWaterItem}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className={css.defWaterBlock}>
          <div>
            <span>{t('modals.addEdit.addwater')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterList;
