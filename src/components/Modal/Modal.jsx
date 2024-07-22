import { useEffect } from 'react';
import icons from '../../img/icons/icons.svg';
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

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
      e.stopPropagation();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div
        className={`${css.content} ${classSectionBox || ''}`}
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
