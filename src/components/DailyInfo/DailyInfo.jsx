import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import ChooseDate from '../ChooseDate/ChooseDate';
import WaterList from '../WaterList/WaterList';

import css from './DailyInfo.module.scss';

const DailyInfo = ({
  openAddWaterModal,
  openEditWaterModal,
  openDeleteWaterModal,
}) => {
  return (
    <div className={css.dailyInfoSec}>
      <div className={css.dailyWrapp}>
        <ChooseDate />
        <AddWaterBtn
          waterClassBtn={css.waterClassBtn}
          openAddWaterModal={openAddWaterModal}
        />
      </div>
      <WaterList
        openEditWaterModal={openEditWaterModal}
        openDeleteWaterModal={openDeleteWaterModal}
      />
    </div>
  );
};

export default DailyInfo;
