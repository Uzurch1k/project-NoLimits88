import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';

import css from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div>
      <DocumentTitle>Home</DocumentTitle>
      <h2>HomePage</h2>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};

export default HomePage;
