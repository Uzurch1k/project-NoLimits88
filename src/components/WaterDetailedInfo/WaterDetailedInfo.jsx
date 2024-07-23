import css from './WaterDetailedInfo.module.scss';
import UserPanel from '../UserPanel/UserPanel';
import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';

const WaterDetailedInfo = ({ openSettings, openLogout, openWaterModal }) => {
  return (
    <div className={css.waterDetailedBg}>
      <UserPanel openSettings={openSettings} openLogout={openLogout} />
      <DailyInfo openWaterModal={openWaterModal} />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
