import css from './WaterDailyNorma.module.scss';

const WaterDailyNorma = () => {
  return (
    <div className={css.dailyNormaSection}>
      <h3 className={css.dailyNormaValue}>1.5 L</h3>
      <p className={css.normaDescr}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
