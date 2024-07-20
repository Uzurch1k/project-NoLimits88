import css from './WaterDetailedInfo.module.scss';
import UserPanel from '../UserPanel/UserPanel';

const WaterDetailedInfo = () => {
  return (
    <div className={css.waterDetailedBg}>
      <UserPanel />
    </div>
  );
};

export default WaterDetailedInfo;
