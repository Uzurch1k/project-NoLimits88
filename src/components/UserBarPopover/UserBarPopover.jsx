import css from './UserBarPopover.module.scss';
import { forwardRef, useState } from 'react';
import icon from '../../img/icons/icons.svg';
import clsx from 'clsx';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import LogOutmodal from '../LogOutModal/LogOutModal';

// eslint-disable-next-line react/display-name
const UserBarPopover = forwardRef((_, ref) => {
  const [activeItem, setActiveItem] = useState(null);

  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const openSettingsModal = () => {
    setSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setSettingsModalOpen(false);
  };

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleOpenSettings = () => {
    setActiveItem('settings');
    openSettingsModal();
  };

  const handleOpenLogout = () => {
    setActiveItem('logout');
    openLogoutModal();
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
          <button
            className={css.userBarPopoverButton}
            onClick={openSettingsModal}
          >
            Settings
          </button>
          <UserSettingsModal
            isOpen={isSettingsModalOpen}
            onClose={closeSettingsModal}
          />
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
          <button
            className={css.userBarPopoverButton}
            onClick={openLogoutModal}
          >
            Log out
          </button>
          <LogOutmodal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
        </li>
      </ul>
    </div>
  );
});

export default UserBarPopover;
