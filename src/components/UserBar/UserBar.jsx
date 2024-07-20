import css from './UserBar.module.scss';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useState, useRef, useEffect } from 'react';
import icon from '../../img/icons/icons.svg';
import clsx from 'clsx';

const UserBar = ({ openSettings, openLogout, user }) => {
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setShowPopover(show => !show);
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
        <svg className={clsx(css.iconArrowDown, { [css.rotate]: showPopover })}>
          <use xlinkHref={icon + '#arrow-down'} />
        </svg>
      </button>
      {showPopover && (
        <UserBarPopover
          openSettings={openSettings}
          openLogout={openLogout}
          ref={popoverRef}
        />
      )}
    </div>
  );
};

export default UserBar;
