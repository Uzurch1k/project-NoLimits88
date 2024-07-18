import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';

import { IoExitOutline } from 'react-icons/io5';

import css from './UserMenu.module.scss';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.usermenu}>
      <p className={css.name}>Welcome, {user.name}</p>
      <button
        type="button"
        className={css.btn}
        onClick={() => dispatch(logOut())}
      >
        <IoExitOutline />
      </button>
    </div>
  );
};

export default UserMenu;
