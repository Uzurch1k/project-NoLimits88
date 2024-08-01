import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import UserBar from '../UserBar/UserBar';

import css from './UserPanel.module.scss';

const UserPanel = ({ openSettings, openLogout }) => {
  const { t } = useTranslation();
  const { name } = useSelector(selectUser);

  return (
    <div className={css.userPanel}>
      <h2 className={css.hello}>
        {t('Userbar.hello')}
        <span className={css.userPanelName}>, {name}!</span>
      </h2>
      <UserBar
        openSettings={openSettings}
        openLogout={openLogout}
        name={name}
      />
    </div>
  );
};

export default UserPanel;
