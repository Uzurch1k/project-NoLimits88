import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/auth/operations';
import clsx from 'clsx';
import css from './LogOutModal.module.scss';

const LogOutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      navigate('/');
    }
  };

  return (
    <div className={css.sectionBox}>
      <h2 className={css.title}>Log out</h2>
      <p className={css.quest}>Do you really want to leave?</p>
      <div className={css.boxBtns}>
        <button
          className={clsx(css.btnlogout, 'btn-def')}
          type="button"
          onClick={handleLogout}
        >
          Log Out
        </button>
        <button className={clsx(css.btncancel, 'btn-def')} type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
