import css from './UserSettingsModal.module.scss';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';

const UserSettingsModal = ({ onClose }) => {
  return (
    <div className={css.sectionBox}>
      <UserSettingsForm onClose={onClose} />
    </div>
  );
};

export default UserSettingsModal;
