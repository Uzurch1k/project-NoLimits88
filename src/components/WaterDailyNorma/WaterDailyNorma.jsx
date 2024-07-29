import { useTranslation } from 'react-i18next';
import css from './WaterDailyNorma.module.scss';

const WaterDailyNorma = () => {
  const { t } = useTranslation();

  return (
    <div className={css.dailyNormaSection}>
      <h3 className={css.dailyNormaValue}>
        1.5 {t('modals.UserSettingsForm.l')}
      </h3>
      <p className={css.normaDescr}>
        {t('modals.UserSettingsForm.dailyNormah')}
      </p>
    </div>
  );
};

export default WaterDailyNorma;
