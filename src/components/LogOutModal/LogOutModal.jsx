import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BaseModal from '../BaseModal/BaseModal';
import { logOut } from '../../redux/auth/operations';
import clsx from 'clsx';
import css from './LogOutModal.module.scss';

const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      dispatch({ type: 'CLEAR_STORE' });
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      classNameModal={css.sectionBox}
    >
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
        <button
          className={clsx(css.btncancel, 'btn-def')}
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </BaseModal>
  );
};

export default LogOutModal;
