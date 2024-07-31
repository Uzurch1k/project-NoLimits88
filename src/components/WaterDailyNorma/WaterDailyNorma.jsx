import { useTranslation } from 'react-i18next';
import css from './WaterDailyNorma.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

const WaterDailyNorma = () => {
  const { t } = useTranslation();

  const user = useSelector(selectUser);
  const dailyWaterNorma = user.amountOfWater;

  return (
    <div className={css.dailyNormaSection}>
      <h3 className={css.dailyNormaValue}>
        {dailyWaterNorma || 0} {t('modals.UserSettingsForm.l')}
      </h3>
      <p className={css.normaDescr}>
        {t('modals.UserSettingsForm.dailyNormah')}
      </p>
    </div>
  );
};

export default WaterDailyNorma;
