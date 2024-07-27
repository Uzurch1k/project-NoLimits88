import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Logo from '../../components/Logo/Logo';
import Languages from '../../components/Languages/Languages';
import { useTranslation } from 'react-i18next';

import css from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className={css.body}>
      <DocumentTitle>{t(`page.Home`)}</DocumentTitle>
      <Languages />
      <Section>
        <div className={css.wrapp}>
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
