import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import UserBar from '../UserBar/UserBar';

import css from './UserPanel.module.scss';

const UserPanel = ({ openSettings, openLogout }) => {
  const { email } = useSelector(selectUser);

  const username = email ? email.split('@')[0] : 'User';

  return (
    <div className={css.userPanel}>
      <h2 className={css.hello}>
        Hello<span className={css.userPanelName}>, {username}</span>!
      </h2>
      <UserBar
        openSettings={openSettings}
        openLogout={openLogout}
        username={username}
      />
    </div>
  );
};

export default UserPanel;
