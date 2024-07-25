import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import css from './WaterMainInfo.module.scss';
import bottlx1 from '../../img/content/bottle@x1.png';
import bottlex2 from '../../img/content/bottle@x2.png';
import Logo from '../../components/Logo/Logo';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';

const WaterMainInfo = ({ openWaterModal }) => {
  return (
    <div className={css.wrapp}>
      <Logo />
      <AddWaterBtn
        waterClassBtn={css.waterClassBtn}
        openWaterModal={openWaterModal}
      />
      <WaterDailyNorma />
      <div className={css.waterInfocard}>
        <img
          className={css.waterInfoImg}
          srcSet={`${bottlx1} 1x, ${bottlex2} 2x `}
          src={bottlx1}
          alt="Bottle image"
        />
      </div>
    </div>
  );
};

export default WaterMainInfo;
