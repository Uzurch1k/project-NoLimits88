import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThreeDots } from 'react-loader-spinner';

import { deleteWaterRecord } from '../../redux/water/operations';

import clsx from 'clsx';
import css from './DeleteWaterModal.module.scss';

const DeleteWaterModal = ({ onClose, idWaterItem }) => {
  const { t } = useTranslation();

  const [isLoader, setIsLoader] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setIsLoader(true);
    try {
      await dispatch(deleteWaterRecord(idWaterItem)).unwrap();

      toast.success('Successfully delete!');
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className={css.sectionBox}>
      <h2 className={css.title}>{t('modals.delete.title')}</h2>
      <p className={css.quest}>{t('modals.delete.text')}</p>
      <div className={css.boxBtns}>
        <button
          className={clsx(
            css.btndelete,
            'btn-def',
            isLoader && css.btnWithLoader
          )}
          type="button"
          onClick={handleDelete}
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
          {t('modals.delete.delete')}
        </button>

        <button
          className={clsx(css.btncancel, 'btn-def')}
          type="button"
          onClick={onClose}
        >
          {t('modals.delete.cancel')}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteWaterModal;
