import css from './UserBarPopover.module.scss';
import { forwardRef, useState } from 'react';
import icon from '../../img/icons/icons.svg';
import clsx from 'clsx';

// eslint-disable-next-line react/display-name
const UserBarPopover = forwardRef(({ openSettings, openLogout }, ref) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleOpenSettings = () => {
    setActiveItem('settings');
    openSettings();
  };

  const handleOpenLogout = () => {
    setActiveItem('logout');
    openLogout();
  };

  return (
    <div ref={ref} className={css.userBarPopover}>
      <ul className={css.userBarPopoverList}>
        <li
          className={clsx(css.userBarPopoverItem, {
            [css.active]: activeItem === 'settings',
          })}
          onClick={handleOpenSettings}
        >
          <svg
            className={clsx(css.iconPopover, {
              [css.activeIcon]: activeItem === 'settings',
            })}
          >
            <use xlinkHref={icon + '#settings'} />
          </svg>
          <button className={css.userBarPopoverButton}>Setting</button>
        </li>
        <li
          className={clsx(css.userBarPopoverItem, {
            [css.active]: activeItem === 'logout',
          })}
          onClick={handleOpenLogout}
        >
          <svg
            className={clsx(css.iconPopover, {
              [css.activeIcon]: activeItem === 'logout',
            })}
          >
            <use xlinkHref={icon + '#arrow-right-on-rectangle'} />
          </svg>
          <button className={css.userBarPopoverButton}>Log out</button>
        </li>
      </ul>
    </div>
  );
});

export default UserBarPopover;
