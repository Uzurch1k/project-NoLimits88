import { NavLink } from 'react-router-dom';

import css from './WelcomeSection.module.scss';

const WelcomeSection = () => {
  return (
    <div>
      <p className={css.welcomeText}>Record daily water intake and track</p>
      <h2 className={css.welcomeTitle}>Water consumption tracker</h2>
      <div className={css.welcomeBtns}>
        <NavLink to="/signup" className="btn-def">
          Try tracker
        </NavLink>
        <NavLink to="/signin" className={css.signInBtn}>
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default WelcomeSection;
