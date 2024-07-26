import css from './WaterList.module.scss';

import WaterItem from '../WaterItem/WaterItem';

const WaterList = ({ openEditWaterModal, openDeleteWaterModal }) => {
  return (
    <div className={css.waterListSec}>
      <div className={css.waterListbody}>
        <ul className={css.waterList}>
          <WaterItem
            openEditWaterModal={openEditWaterModal}
            openDeleteWaterModal={openDeleteWaterModal}
          />
        </ul>
      </div>
    </div>
  );
};

export default WaterList;
