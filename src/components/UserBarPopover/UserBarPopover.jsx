import css from './UserBarPopover.module.scss';
import { forwardRef, useState } from 'react';
import icon from '../../img/icons/icons.svg';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import LogOutModal from '../LogOutModal/LogOutModal';

// eslint-disable-next-line react/display-name
const UserBarPopover = forwardRef((_, ref) => {
  const [modals, setModals] = useState({
    settings: false,
    logout: false,
  });

  const handleOpenModal = item => {
    setModals(prev => ({ ...prev, [item]: true }));
  };

  const handleCloseModal = item => {
    setModals(prev => ({ ...prev, [item]: false }));
  };

  return (
    <div ref={ref} className={css.userBarPopover}>
      <ul className={css.userBarPopoverList}>
        <li
          className={css.userBarPopoverItem}
          onClick={() => handleOpenModal('settings')}
        >
          <button className={css.userBarPopoverButton}>
            <svg className={css.iconPopover}>
              <use xlinkHref={`${icon}#settings`} />
            </svg>
            Settings
          </button>
          <UserSettingsModal
            isOpen={modals.settings}
            onClose={() => handleCloseModal('settings')}
          />
        </li>
        <li
          className={css.userBarPopoverItem}
          onClick={() => handleOpenModal('logout')}
        >
          <button className={css.userBarPopoverButton}>
            <svg className={css.iconPopover}>
              <use xlinkHref={`${icon}#logout`} />
            </svg>
            Log out
          </button>
          <LogOutModal
            isOpen={modals.logout}
            onClose={() => handleCloseModal('logout')}
          />
        </li>
      </ul>
    </div>
  );
});

export default UserBarPopover;
