import { NavLink } from 'react-router-dom';

import css from './WelcomeSection.module.scss';

const WelcomeSection = () => {
  return (
    <div className={css.bloc}>
      <h2>WelcomeSection</h2>
      <NavLink to="/signup">Try tracker</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
    </div>
  );
};

export default WelcomeSection;
