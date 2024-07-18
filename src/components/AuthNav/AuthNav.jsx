import { NavLink } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import clsx from 'clsx';
import css from './AuthNav.module.scss';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const AuthNav = () => {
  return (
    <div className={css.aut}>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        <span>Log In</span>
        <FiLogIn />
      </NavLink>
    </div>
  );
};

export default AuthNav;
