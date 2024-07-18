import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';

import css from './TrackerPage.module.scss';

const TrackerPage = () => {
  return (
    <div className={css.bloc}>
      <DocumentTitle>Tracker</DocumentTitle>
      <Section>
        <div>
          <h2>TrackerPage</h2>
          <WaterMainInfo />
        </div>
        <div>
          <WaterDetailedInfo />
        </div>
      </Section>
    </div>
  );
};

export default TrackerPage;
