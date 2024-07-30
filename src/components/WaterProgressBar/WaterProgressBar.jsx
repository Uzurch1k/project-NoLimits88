import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectTotalAmountOfWaterDrunkPerDay } from '../../redux/water/selectors';
import { selectUserDailyNorma } from '../../redux/auth/selectors';
import { calculateWaterProgress } from '../../helpers/calculateWaterProgress';

import css from './WaterProgressBar.module.scss';

const WaterProgressBar = () => {
  const { t } = useTranslation();

  const amountOfWaterDrunkPerDay = useSelector(
    selectTotalAmountOfWaterDrunkPerDay
  );

  const userDailyNorma = useSelector(selectUserDailyNorma);

  const progressPercents = calculateWaterProgress(
    amountOfWaterDrunkPerDay,
    userDailyNorma
  );

  const progressBarRef = useRef(null);
  const [ellipseLeft, setEllipseLeft] = useState(0);

  useEffect(() => {
    if (progressBarRef.current) {
      const barWidth = progressBarRef.current.offsetWidth; // Ширина родительского контейнера в пикселях
      const percentWidth = (barWidth * progressPercents) / 100; // Ширина в пикселях для 50%
      const leftPosition = percentWidth - 6; // Уменьшаем на 12 пикселей
      const leftPercent = (leftPosition / barWidth) * 100; // Преобразуем в проценты
      setEllipseLeft(leftPercent);
    }
  }, [progressPercents]);

  return (
    <div className={css.waterProgressBarSection}>
      <div className={css.waterProgressBarBody}>
        <h3 className={css.waterBarTitle}>{t('waterMainInfo.today')}</h3>

        <div className={css.waterProgressBar} ref={progressBarRef}>
          <div
            className={css.progressBarFill}
            style={{ width: `${progressPercents}%` }}
          >
            <div
              className={css.progressEllipse}
              style={{ left: `${ellipseLeft}%` }} // Используем вычисленное значение
            >
              <span
                className={css.progressPercent}
              >{`${progressPercents}%`}</span>
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
