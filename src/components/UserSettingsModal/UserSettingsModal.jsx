import css from './UserSettingsModal.module.scss';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';

const UserSettingsModal = () => {
  return (
    <div className={css.sectionBox}>
      <UserSettingsForm />
    </div>
  );
};

export default UserSettingsModal;
