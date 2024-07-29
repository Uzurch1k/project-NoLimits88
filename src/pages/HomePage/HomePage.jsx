import { useSpring, animated } from '@react-spring/web';

import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Logo from '../../components/Logo/Logo';

import css from './HomePage.module.scss';

const HomePage = () => {
  const animationPropsLaft = useSpring({
    from: { opacity: 0, transform: 'translateX(20px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { duration: 250 },
  });

  const animationPropsRight = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { duration: 250 },
  });

  return (
    <div className={css.body}>
      <DocumentTitle>Home</DocumentTitle>
      <Section>
        <animated.div style={animationPropsLaft} className={css.wrapp}>
          <Logo />
          <WelcomeSection />
        </animated.div>

        <animated.div style={animationPropsRight}>
          <AdvantagesSection />
        </animated.div>
      </Section>
    </div>
  );
};

export default HomePage;
