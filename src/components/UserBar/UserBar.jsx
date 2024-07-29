import { selectUser } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import icon from '../../img/icons/symbol.svg';
import defaultAvatar from '../../img/content/default avatar.png';

import clsx from 'clsx';
import css from './UserBar.module.scss';

const UserBar = ({ openSettings, openLogout, name }) => {
  const { photo } = useSelector(selectUser);
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
        <p>{name}</p>

        <div className={css.avatarWrapper}>
          {photo ? (
            <img src={photo} alt="" />
          ) : (
            <img src={defaultAvatar} alt="" />
          )}
        </div>

        <div className={css.iconArrowWrapp}>
          <svg className={clsx(css.iconArrowUp, { [css.rotate]: showPopover })}>
            <use xlinkHref={`${icon}#icon-arrow-up`} />
          </svg>
        </div>
      </button>

      <div className={clsx(css.popoverContainer, { [css.open]: showPopover })}>
        <UserBarPopover
          ref={popoverRef}
          openSettings={openSettings}
          openLogout={openLogout}
          isOpen={showPopover}
        />
      </div>
    </div>
  );
};

export default UserBar;
