import { useTranslation } from 'react-i18next';

import icons from '../../img/icons/symbol.svg';

import css from './Languages.module.scss';

const Languages = () => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  return (
    <ul
      data-aos="zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="300"
      data-aos-offset="0"
      className={css.languages}
    >
      <li>
        <button
          className={css.languageBtn}
          onClick={() => changeLanguage('en')}
        >
          <svg
            width="18"
            height="18"
            aria-label="Flag en"
            className={css.iconFlag}
          >
            <use xlinkHref={`${icons}#en-flag`}></use>
          </svg>
        </button>
      </li>
      <li className={css.line}></li>
      <li>
        <button
          className={css.languageBtn}
          onClick={() => changeLanguage('uk')}
        >
          <svg
            width="18"
            height="18"
            aria-label="Flag ua"
            className={css.iconFlag}
          >
            <use xlinkHref={`${icons}#ua-flag`}></use>
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Languages;
