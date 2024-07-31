import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectTotalAmountOfWaterDrunkPerDay } from '../../redux/water/selectors';
import { selectUserDailyNorma } from '../../redux/auth/selectors';
import { calculateWaterProgress } from '../../helpers/calculateWaterProgress';

import css from './WaterProgressBar.module.scss';
import clsx from 'clsx';

const WaterProgressBar = () => {
  const { t } = useTranslation();
  const progressBarRef = useRef(null);
  const [ellipseLeft, setEllipseLeft] = useState(0);

  const amountOfWaterDrunkPerDay = useSelector(
    selectTotalAmountOfWaterDrunkPerDay
  );
  const userDailyNorma = useSelector(selectUserDailyNorma);

  const progressPercents = calculateWaterProgress(
    amountOfWaterDrunkPerDay,
    userDailyNorma
  );

  const limitedProgressPercents = Math.min(progressPercents, 100);

  useEffect(() => {
    if (progressBarRef.current) {
      const barWidth = progressBarRef.current.offsetWidth;
      const percentWidth = (barWidth * limitedProgressPercents) / 100;
      const leftPosition = percentWidth - 6;
      const leftPercent = (leftPosition / barWidth) * 100;
      setEllipseLeft(leftPercent);
    }
  }, [limitedProgressPercents]);

  return (
    <div className={css.waterProgressBarSection}>
      <div className={css.waterProgressBarBody}>
        <h3 className={css.waterBarTitle}>{t('waterMainInfo.today')}</h3>
        <div className={css.waterProgressBar} ref={progressBarRef}>
          <div
            className={clsx(css.progressBarFill, {
              [css.yellowProgressBg]: progressPercents >= 100,
            })}
            style={{ width: `${limitedProgressPercents}%` }}
          >
            <div
              className={css.progressEllipse}
              style={{ left: `${ellipseLeft}%` }}
            >
              <span
                className={clsx(css.progressPercent, {
                  [css.yellowProgressCl]: progressPercents >= 100,
                })}
              >
                {progressPercents}%
              </span>
            </div>
          </div>
        </div>
        <ul className={css.percentContainer}>
          <li className={css.waterProgressValue}>0%</li>
          <li className={css.waterProgressValue}>50%</li>
          <li className={css.waterProgressValue}>100%</li>
        </ul>
      </div>
    </div>
  );
};

export default WaterProgressBar;
