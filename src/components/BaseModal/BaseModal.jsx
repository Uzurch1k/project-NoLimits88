import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import clsx from 'clsx';

import icons from '../../img/icons/symbol.svg';
import css from './BaseModal.module.scss';

const BaseModal = ({ isOpen, onClose, classNameModal, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(css.noScroll);
    } else {
      document.body.classList.remove(css.noScroll);
    }
    return () => {
      document.body.classList.remove(css.noScroll);
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={clsx(css.bodyDef, classNameModal)}
      ariaHideApp={false}
      overlayClassName={{
        base: css.overlay,
        afterOpen: css.overlayAfterOpen,
        beforeClose: css.overlayBeforeClose,
      }}
      closeTimeoutMS={200}
    >
      <button className={css.buttonClose} onClick={onClose}>
        <svg className={css.icon}>
          <use href={`${icons}#icon-close`}></use>
        </svg>
      </button>
      {children}
    </Modal>
  );
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classNameModal: PropTypes.string,
  children: PropTypes.node,
};

export default BaseModal;
