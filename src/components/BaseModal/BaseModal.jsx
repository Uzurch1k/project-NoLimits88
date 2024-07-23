import PropTypes from 'prop-types';
import css from './BaseModal.module.scss';
import Modal from 'react-modal';
import icons from '../../img/icons/icons.svg';

const BaseModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      ariaHideApp={false}
      overlayClassName={css.overlay}
    >
      <button className={css.buttonClose} onClick={onClose}>
        <svg className={css.icon}>
          <use href={`${icons}#modal-close`}></use>
        </svg>
      </button>
      {children}
    </Modal>
  );
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default BaseModal;