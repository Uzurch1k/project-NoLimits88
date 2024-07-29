import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import css from './WelcomeSection.module.scss';

const WelcomeSection = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className={css.welcomeText}>{t('welcomeSection.mainText')}</p>
      <h1 className={css.welcomeTitle}>{t('welcomeSection.title')}</h1>
      <div className={css.welcomeBtns}>
        <NavLink to="/signup" className="btn-def">
          {t('welcomeSection.tryTracker')}
        </NavLink>
        <NavLink to="/signin" className={css.signInBtn}>
          {t('welcomeSection.signIn')}
        </NavLink>
      </div>
    </div>
  );
};

export default WelcomeSection;
