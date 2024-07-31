import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSelectedDay } from '../../redux/water/selectors';

import { formatChooseDate } from '../../helpers/formatChooseDate';

import css from './ChooseDate.module.scss';

const ChooseDate = () => {
  const { t } = useTranslation();

  const waterOfDay = useSelector(selectSelectedDay);
  const formattedDate = formatChooseDate(waterOfDay);

  return (
    <div className={css.chooseDate}>
      <h2>{t('ChooseDate.today')}</h2>
    </div>
  );
};

export default ChooseDate;
