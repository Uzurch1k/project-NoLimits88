import css from './WaterDailyNorma.module.scss';

const WaterDailyNorma = () => {
  return (
    <div className={css.dailyNormaSection}>
      <p className={css.dailyNormaValue}>1.5 L</p>
      <p className={css.normaDescr}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
