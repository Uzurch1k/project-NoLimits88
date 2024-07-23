import css from './UserSettingsModal.module.scss';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import BaseModal from '../BaseModal/BaseModal';

const UserSettingsModal = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className={css.sectionBox}>
      <UserSettingsForm />
    </BaseModal>
  );
};

export default UserSettingsModal;
