import css from './LogOutModal.module.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { logOut } from '../../redux/auth/operations'

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
      <Modal isOpen={isOpen} onClose={onClose} className={css.content}>
        <h2 className={css.title}>Log out</h2>
        <p className={css.quest}>Do you really want to leave?</p>
        <button className={css.btnlogout} type='button' onClick={handleLogout}> Log Out </button>
        <button className={css.btncancel} type='button' onClick={onClose}>Cancel</button>
      </Modal>
  );
};

export default LogOutModal;
