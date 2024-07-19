import { NavLink } from 'react-router-dom';

import css from './WelcomeSection.module.scss';

const WelcomeSection = () => {
  return (
    <div className={css.body}>
      <p>Record daily water intake and track</p>
      <h2>Water consumption tracker</h2>
      <NavLink to="/signup" className="btn-def">
        Try tracker
      </NavLink>
      <NavLink to="/signin">Sign In</NavLink>
    </div>
  );
};

export default WelcomeSection;
