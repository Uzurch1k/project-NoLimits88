import { useTranslation } from 'react-i18next';
import css from './UserBarPopover.module.scss';
import { forwardRef } from 'react';
import icon from '../../img/icons/symbol.svg';

const UserBarPopover = forwardRef(
  ({ openSettings, openLogout, isOpen }, ref) => {
    const { t } = useTranslation();

    return (
      <div
        ref={ref}
        className={`${css.userBarPopover} ${isOpen ? css.open : ''}`}
      >
        <ul className={css.userBarPopoverList}>
          <li className={css.userBarPopoverItem} onClick={openSettings}>
            <button className={css.userBarPopoverButton}>
              <div className={css.iconWrap}>
                <svg className={css.iconPopover}>
                  <use xlinkHref={`${icon}#icon-settings`} />
                </svg>
              </div>
              <span>{t('Userbar.setting')}</span>
            </button>
          </li>
          <li className={css.userBarPopoverItem} onClick={openLogout}>
            <button className={css.userBarPopoverButton}>
              <div className={css.iconWrap}>
                <svg className={css.iconPopover}>
                  <use xlinkHref={`${icon}#icon-logout`} />
                </svg>
              </div>
              <span>{t('Userbar.logOut')}</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
);

UserBarPopover.displayName = 'UserBarPopover';

export default UserBarPopover;
