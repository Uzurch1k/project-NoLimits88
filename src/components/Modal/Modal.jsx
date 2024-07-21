import { useEffect } from 'react';
import icons from '../../img/icons/icons.svg';
import css from './Modal.module.scss';

const Modal = ({ children, isOpen, onClose, className }) => {
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={`${css.content} ${className || ''}`}
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
