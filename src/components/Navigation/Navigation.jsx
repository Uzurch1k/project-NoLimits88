import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../redux/auth/selectors';

import { FaRegAddressBook } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';

import clsx from 'clsx';
import css from './Navigation.module.scss';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink className={buildLinkClass} to="/">
        <IoIosHome />
        <span>Home</span>
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildLinkClass} to="/contacts">
          <FaRegAddressBook />
          <span>Contacts</span>
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
