import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Logo from '../../components/Logo/Logo';

import css from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={css.bloc}>
      <DocumentTitle>Home</DocumentTitle>
      <Section>
        <div>
          <h2>HomePage</h2>
          <Logo />
          <WelcomeSection />
        </div>
        <div>
          <AdvantagesSection />
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
