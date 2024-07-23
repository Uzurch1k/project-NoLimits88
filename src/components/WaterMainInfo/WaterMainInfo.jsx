import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import css from './WaterMainInfo.module.scss';
import bottle from '../../img/content/bottle@x1.png';
import Logo from '../../components/Logo/Logo';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
const WaterMainInfo = () => {
  return (
    <div className={css.wrapp}>
      <Logo />
      <AddWaterBtn />
      <WaterDailyNorma />
      <div>
        <img src={bottle} />
      </div>
    </div>
  );
};

export default WaterMainInfo;
