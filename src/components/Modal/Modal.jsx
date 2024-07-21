import { useEffect } from 'react';
import icons from '../../img/icons/icons.svg';
import clsx from 'clsx';

import css from './Modal.module.scss';

const Modal = ({ children, isOpen, onClose, classSectionBox }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={clsx(css.content, classSectionBox)}
        onClick={e => e.stopPropagation()}
      >
        <button className={css.closebutton} onClick={onClose}>
          <svg className={css.icon}>
            <use href={`${icons}#arrow-left`}></use>
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
