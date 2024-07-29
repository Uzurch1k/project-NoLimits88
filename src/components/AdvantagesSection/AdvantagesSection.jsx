import { useTranslation } from 'react-i18next';
import css from './AdvantagesSection.module.scss';
import ava1 from '../../img/content/ava1.png';
import ava2 from '../../img/content/ava2.png';
import ava3 from '../../img/content/ava3.png';

const AdvantagesSection = () => {
  const { t } = useTranslation();

  return (
    <div className={css.advantagesSection}>
      <div className={css.customers}>
        <ul className={css.customersBox}>
          <li className={css.customerImgBox}>
            <img
              className={css.customerImg}
              src={ava1}
              alt={t('User avatar')}
            />
          </li>
          <li className={css.customerImgBox}>
            <img
              className={css.customerImg}
              src={ava2}
              alt={t('User avatar')}
            />
          </li>
          <li className={css.customerImgBox}>
            <img
              className={css.customerImg}
              src={ava3}
              alt={t('User avatar')}
            />
          </li>
        </ul>
        <p className={css.text}>
          {t('advantagesSection.our')}{' '}
          <span className={css.highlightedText}>
            {t('advantagesSection.happy')}
          </span>
          <br />
          {t('advantagesSection.customers')}
        </p>
      </div>
      <div className={css.group}>
        <ul className={css.advantagesGroup}>
          <li className={css.advantagesGroupItem}>
            <span className={css.ellipse}></span>
            <p>{t('advantagesSection.habit')}</p>
          </li>
          <li className={css.advantagesGroupItem}>
            <p>{t('advantagesSection.statistics')}</p>
          </li>
          <li className={css.advantagesGroupItem}>
            <p>{t('advantagesSection.setting')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;
