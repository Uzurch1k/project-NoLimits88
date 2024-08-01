import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/auth/operations';

import { ThreeDots } from 'react-loader-spinner';

import clsx from 'clsx';
import css from './LogOutModal.module.scss';

const LogOutModal = ({ onClose }) => {
  const { t } = useTranslation();

  const [isLoader, setIsLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoader(true);
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setIsLoader(false);
      navigate('/');
    }
  };

  return (
    <div className={css.sectionBox}>
      <h2 className={css.title}>{t('modals.logOut.title')}</h2>
      <p className={css.quest}>{t('modals.logOut.text')}</p>
      <div className={css.boxBtns}>
        <button
          className={clsx(
            css.btnlogout,
            'btn-def',
            isLoader && css.btnWithLoader
          )}
          type="button"
          onClick={handleLogout}
        >
          {isLoader && (
            <ThreeDots
              visible={true}
              radius="9"
              color="white"
              ariaLabel="three-dots-loading"
              wrapperClass={css.loader}
            />
          )}
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
