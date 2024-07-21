import css from './UserBarPopover.module.scss';
import { forwardRef, useState } from 'react';
import icon from '../../img/icons/icons.svg';
import clsx from 'clsx';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import LogOutmodal from '../LogOutModal/LogOutModal';

// eslint-disable-next-line react/display-name
const UserBarPopover = forwardRef((_, ref) => {
  const [activeItem, setActiveItem] = useState(null);
  const [modals, setModals] = useState({
    settings: false,
    logout: false,
  });

  const handleOpenModal = item => {
    console.log(`handleOpenModal ${item} modal`);
    setActiveItem(item);
    setModals(prev => ({ ...prev, [item]: true }));
  };

  const handleCloseModal = item => {
    console.log(`handleCloseModal ${item} modal`);
    setActiveItem(null);
    setModals(prev => ({ ...prev, [item]: false }));
  };

  return (
    <div ref={ref} className={css.userBarPopover}>
      <ul className={css.userBarPopoverList}>
        <li
          className={clsx(css.userBarPopoverItem, {
            [css.active]: activeItem === 'settings',
          })}
          onClick={() => handleOpenModal('settings')}
        >
          <svg
            className={clsx(css.iconPopover, {
              [css.activeIcon]: activeItem === 'settings',
            })}
          >
            <use xlinkHref={`${icon}#settings`} />
          </svg>
          <button className={css.userBarPopoverButton}>Settings</button>
          <UserSettingsModal
            isOpen={modals.settings}
            onClose={() => handleCloseModal('settings')}
          />
        </li>
        <li
          className={clsx(css.userBarPopoverItem, {
            [css.active]: activeItem === 'logout',
          })}
          onClick={() => handleOpenModal('logout')}
        >
          <svg
            className={clsx(css.iconPopover, {
              [css.activeIcon]: activeItem === 'logout',
            })}
          >
            <use xlinkHref={`${icon}#arrow-right-on-rectangle`} />
          </svg>
          <button className={css.userBarPopoverButton}>Log out</button>
          <LogOutmodal
            isOpen={modals.logout}
            onClose={() => handleCloseModal('logout')}
          />
        </li>
      </ul>
    </div>
  );
});

export default UserBarPopover;
