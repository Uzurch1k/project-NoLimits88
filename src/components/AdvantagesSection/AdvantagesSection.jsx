import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectUserCount } from '../../redux/auth/selectors';
import { getUserCount } from '../../redux/auth/operations';

import ava1 from '../../img/content/ava1.png';
import ava2 from '../../img/content/ava2.png';
import ava3 from '../../img/content/ava3.png';

import css from './AdvantagesSection.module.scss';

const AdvantagesSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userCount = useSelector(selectUserCount);

  useEffect(() => {
    dispatch(getUserCount());
  }, [dispatch]);

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
        <p className={css.text}>{t('happy customers')}</p>
        <p className={css.text}>
          <span className={css.highlightedtext}>{userCount || 0} happy</span>
          <br /> customers
        </p>
      </div>
      <div className={css.group}>
        <ul className={css.advantagesGroup}>
          <li className={css.advantagesGroupItem}>
            <span className={css.ellipse}></span>
            <p>{t('Habit drive')}</p>
          </li>
          <li className={css.advantagesGroupItem}>
            <p>{t('View statistics')}</p>
          </li>
          <li className={css.advantagesGroupItem}>
            <p>{t('Personal rate setting')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;
