import css from './UserBarPopover.module.scss';
import { forwardRef } from 'react';
import icon from '../../img/icons/icons.svg';

// eslint-disable-next-line react/display-name
const UserBarPopover = forwardRef(({ openSettings, openLogout }, ref) => (
  <div ref={ref} className={css.userBarPopover}>
    <ul className={css.userBarPopoverList}>
      <li className={css.userBarPopoverItem} onClick={openSettings}>
        <button className={css.userBarPopoverButton}>
          <svg className={css.iconPopover}>
            <use xlinkHref={`${icon}#settings`} />
          </svg>
          Settings
        </button>
      </li>
      <li className={css.userBarPopoverItem} onClick={openLogout}>
        <button className={css.userBarPopoverButton}>
          <svg className={css.iconPopover}>
            <use xlinkHref={`${icon}#logout`} />
          </svg>
          Log out
        </button>
      </li>
    </ul>
  </div>
));

export default UserBarPopover;
