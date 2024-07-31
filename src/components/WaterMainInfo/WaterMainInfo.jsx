import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';

import Logo from '../../components/Logo/Logo';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import Languages from '../Languages/Languages';

import bottlx1 from '../../img/content/bottle@x1.png';
import bottlex2 from '../../img/content/bottle@x2.png';

import css from './WaterMainInfo.module.scss';

const WaterMainInfo = ({ openAddWaterModal }) => {
  return (
    <div className={css.wrapp}>
      <Logo />
      <Languages />
      <ThemeToggleButton />
      <AddWaterBtn
        waterClassBtn={css.waterClassBtn}
        openAddWaterModal={openAddWaterModal}
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
      <WaterProgressBar />
    </div>
  );
};

export default WaterMainInfo;
