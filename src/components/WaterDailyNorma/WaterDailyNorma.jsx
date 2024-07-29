import css from './WaterDailyNorma.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

const WaterDailyNorma = () => {
  const user = useSelector(selectUser);
  const dailyWaterNorma = user.amountOfWater;

  return (
    <div className={css.dailyNormaSection}>
      <h3 className={css.dailyNormaValue}>{dailyWaterNorma || 0} L</h3>
      <p className={css.normaDescr}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
