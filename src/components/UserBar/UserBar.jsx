import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.scss';
import icon from '../../img/icons/icons.svg';

const UserBar = ({ openSettings, openLogout, user }) => {
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setShowPopover(prev => !prev);
  };

  const handleClickOutside = e => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover]);

  return (
    <div className={css.userBar}>
      <button
        type="button"
        className={css.userBarButton}
        onClick={togglePopover}
        ref={buttonRef}
      >
        <p>{user.name}</p>

        <div className={css.avatarWrapper}>
          <img src={user.avatar} alt="Avatar user" />
        </div>

        <div className={css.iconArrowWrapp}>
          <svg
            className={clsx(css.iconArrowDown, { [css.rotate]: showPopover })}
          >
            <use xlinkHref={`${icon}#arrow-down`} />
          </svg>
        </div>
      </button>

      {showPopover && (
        <UserBarPopover
          ref={popoverRef}
          openSettings={openSettings}
          openLogout={openLogout}
        />
      )}
    </div>
  );
};

export default UserBar;
