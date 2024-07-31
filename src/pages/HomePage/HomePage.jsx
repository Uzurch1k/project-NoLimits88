import { useEffect, useState } from 'react';

import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Logo from '../../components/Logo/Logo';
import ThemeToggleButton from '../../components/ThemeToggleButton/ThemeToggleButton';

import clsx from 'clsx';
import css from './HomePage.module.scss';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   setIsVisible(true);
  // }, []);

  return (
    <div className={css.body}>
      <DocumentTitle>Home</DocumentTitle>
      <Section>
        <div
          className={clsx(css.wrapp, css.blockLaft, {
            [css.animationLaft]: isVisible,
          })}
        >
          <Logo />
          <ThemeToggleButton />
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
