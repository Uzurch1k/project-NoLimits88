import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import ChooseDate from '../ChooseDate/ChooseDate';
import WaterList from '../WaterList/WaterList';

import css from './DailyInfo.module.scss';

const DailyInfo = ({ openWaterModal }) => {
  return (
    <div className={css.dailyInfoSec}>
      <div className={css.dailyWrapp}>
        <ChooseDate />
        <AddWaterBtn
          waterClassBtn={css.waterClassBtn}
          openWaterModal={openWaterModal}
        />
      </div>
      <WaterList />
    </div>
  );
};

export default DailyInfo;
