import { useSelector } from 'react-redux';

import { selectIsRefreshing } from '../../../redux/auth/selectors';
import { LoaderMain } from '../../Loader/Loader';

import css from './Section.module.scss';

const Section = ({ children }) => {
  const isRefreshing = useSelector(selectIsRefreshing);

  return isRefreshing ? (
    <LoaderMain />
  ) : (
    <div className="container">
      <div className={css.section}>{children}</div>
    </div>
  );
};

export default Section;
