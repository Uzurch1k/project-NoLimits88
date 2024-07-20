import css from './UserPanel.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import UserBar from '../UserBar/UserBar';
import avatar from '../../img/content/default avatar.png';

const UserPanel = ({ openSettings, openLogout }) => {
  const userDataFromStore = useSelector(selectUser);

  const user =
    userDataFromStore && userDataFromStore.name && userDataFromStore.avatar
      ? userDataFromStore
      : {
          name: 'User',
          avatar: avatar,
        };

  return (
    <div className={css.userPanel}>
      <h2 className={css.hello}>
        Hello, <span className={css.userPanelName}>{user.name}</span>!
      </h2>
      <UserBar
        openSettings={openSettings}
        openLogout={openLogout}
        user={user}
      />
    </div>
  );
};

export default UserPanel;
