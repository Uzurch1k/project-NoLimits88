import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';
import Section from '../../components/Layout/Section/Section';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';

import css from './TrackerPage.module.scss';

const TrackerPage = () => {
  return (
    <div className={css.body}>
      <DocumentTitle>Tracker</DocumentTitle>
      <Section>
        <div>
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
