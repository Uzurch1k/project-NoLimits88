import { useTranslation } from 'react-i18next';
import css from './ChooseDate.module.scss';

const ChooseDate = () => {
  const { t } = useTranslation();

  return (
    <div className={css.chooseDate}>
      <h2>{t('ChooseDate.today')}</h2>
    </div>
  );
};

export default ChooseDate;
