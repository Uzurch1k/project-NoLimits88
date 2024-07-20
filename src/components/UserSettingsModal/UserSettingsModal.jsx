import css from './UserSettingsModal.module.scss';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import Modal from '../Modal/Modal'

const UserSettingsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={css.settings}>
        <h2>Settings</h2>
        <UserSettingsForm />
    </Modal>
  );
};

export default UserSettingsModal;
