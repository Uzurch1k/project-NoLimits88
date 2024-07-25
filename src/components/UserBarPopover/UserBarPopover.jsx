import css from './UserBarPopover.module.scss';
import { forwardRef } from 'react';
import icon from '../../img/icons/symbol.svg';

// eslint-disable-next-line react/display-name
const UserBarPopover = forwardRef(({ openSettings, openLogout }, ref) => (
  <div ref={ref} className={css.userBarPopover}>
    <ul className={css.userBarPopoverList}>
      <li className={css.userBarPopoverItem} onClick={openSettings}>
        <button className={css.userBarPopoverButton}>
          <div className={css.iconWrap}>
            <svg className={css.iconPopover}>
              <use xlinkHref={`${icon}#icon-settings`} />
            </svg>
          </div>
          <span>Setting</span>
        </button>
      </li>
      <li className={css.userBarPopoverItem} onClick={openLogout}>
        <button className={css.userBarPopoverButton}>
          <div className={css.iconWrap}>
            <svg className={css.iconPopover}>
              <use xlinkHref={`${icon}#icon-logout`} />
            </svg>
          </div>
          <span>Log out</span>
        </button>
      </li>
    </ul>
  </div>
));

export default UserBarPopover;
