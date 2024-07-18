import { Link } from 'react-router-dom';

import Section from '../../components/Layout/Section/Section';
import DocumentTitle from '../../components/Layout/DocumentTitle/DocumentTitle';

import { FaArrowDownLong } from 'react-icons/fa6';
import { LuPlus } from 'react-icons/lu';

import css from './HomePage.module.scss';

const HomePage = () => {
  return (
    <Section>
      <DocumentTitle>Home</DocumentTitle>
      <div className={css.home}>
        <h1 className={css.title}>Welcome to the contact book</h1>
        <p className={css.text}>Enrich your contact list</p>

        <div className={css.go}>
          <div className={css.vector}>
            <span>
              <FaArrowDownLong />
            </span>
          </div>
          <Link className={css.link} to="/contacts">
            <span>
              <LuPlus />
            </span>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default HomePage;
