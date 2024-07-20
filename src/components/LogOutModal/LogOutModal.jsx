import css from './LogOutModal.module.scss';
import Modal from '../Modal/Modal';

const LogOutModal = ({ isOpen, onClose }) => {
  return (
    <div className={css.bloc}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2>Log out</h2>
      </Modal>
    </div>
  );
};

export default LogOutModal;
