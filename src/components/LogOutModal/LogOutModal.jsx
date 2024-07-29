import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/auth/operations';

import clsx from 'clsx';
import css from './LogOutModal.module.scss';

const LogOutModal = ({ onClose }) => {
  const { t } = useTranslation();
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
      <h2 className={css.title}>{t('modals.logOut.title')}</h2>
      <p className={css.quest}>{t('modals.logOut.text')}</p>
      <div className={css.boxBtns}>
        <button
          className={clsx(css.btnlogout, 'btn-def')}
          type="button"
          onClick={handleLogout}
        >
          {t('modals.logOut.logOut')}
        </button>
        <button
          className={clsx(css.btncancel, 'btn-def')}
          type="button"
          onClick={onClose}
        >
          {t('modals.logOut.cancel')}
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
