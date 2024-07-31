import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Logo from '../../components/Logo/Logo';
import ThemeToggleButton from '../../components/ThemeToggleButton/ThemeToggleButton';
import Languages from '../../components/Languages/Languages';

import clsx from 'clsx';
import css from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   setIsVisible(true);
  // }, []);

  return (
    <div className={css.body}>
      <DocumentTitle>{t(`page.Home`)}</DocumentTitle>
      <Section>
        <div
          className={clsx(css.wrapp, css.blockLaft, {
            [css.animationLaft]: isVisible,
          })}
        >
          <Logo />
          <ThemeToggleButton />
          <Languages />
          <WelcomeSection />
        </div>

        <div
          className={clsx(css.blockRight, { [css.animationRight]: isVisible })}
        >
          <AdvantagesSection />
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
