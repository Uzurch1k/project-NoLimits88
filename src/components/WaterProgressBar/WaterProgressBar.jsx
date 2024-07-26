import css from './WaterProgressBar.module.scss';

const WaterProgressBar = () => {
  const progressPercents = 21;

  return (
    <div className={css.waterProgressBarSection}>
      <h3 className={css.waterBarTitle}>today</h3>
      <div>
        <div className={css.waterProgressBar}>
          <div
            className={css.progressBarFill}
            style={{ width: `${progressPercents}% ` }}
          >
            <p
              className={css.progressPercent}
              style={{ left: `${progressPercents}%` }}
            >
              {progressPercents}%
            </p>
            <div
              className={css.ellipse}
              style={{ left: `${progressPercents - 1}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className={css.percentContainer}>
        <p className={css.waterProgressValue}>0%</p>
        <p className={css.waterProgressValue}>50%</p>
        <p className={css.waterProgressValue}>100%</p>
      </div>
    </div>
  );
};

export default WaterProgressBar;
