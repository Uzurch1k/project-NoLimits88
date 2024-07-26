import css from './WaterDetailedInfo.module.scss';
import UserPanel from '../UserPanel/UserPanel';
import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';

const WaterDetailedInfo = ({
  openSettings,
  openLogout,
  openAddWaterModal,
  openEditWaterModal,
  openDeleteWaterModal,
}) => {
  return (
    <div className={css.waterDetailedSec}>
      <UserPanel openSettings={openSettings} openLogout={openLogout} />
      <DailyInfo
        openAddWaterModal={openAddWaterModal}
        openEditWaterModal={openEditWaterModal}
        openDeleteWaterModal={openDeleteWaterModal}
      />
      <div className={css.waterDetailedWrapp}>
        <MonthInfo />
      </div>
    </div>
  );
};

export default WaterDetailedInfo;
