import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectUserCount } from '../../redux/auth/selectors';
import { getUserCount } from '../../redux/auth/operations';
import { getRandomPhotos } from '../../helpers/randomPhotos';

import ava1 from '../../img/content/ava1.png';
import ava2 from '../../img/content/ava2.png';
import ava3 from '../../img/content/ava3.png';

import css from './AdvantagesSection.module.scss';

const AdvantagesSection = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { count = 0, photos = [] } = useSelector(selectUserCount) || {};

  useEffect(() => {
    dispatch(getUserCount());
  }, [dispatch]);

  const defaultPhotos = [ava1, ava2, ava3];
  const displayPhotos = getRandomPhotos(photos, defaultPhotos, 3);

  return (
    <div className={css.advantagesSection}>
      <div className={css.customers}>
        <ul className={css.customersBox}>
          {displayPhotos.map((photo, index) => (
            <li key={index} className={css.customerImgBox}>
              <img
                className={css.customerImg}
                src={photo}
                alt={t('User avatar')}
              />
            </li>
          ))}
        </ul>
        <p className={css.text}>
          <span className={css.highlightedtext}>
            {count} {t('advantagesSection.happy')}
          </span>
          <br /> {t('advantagesSection.customers')}
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
