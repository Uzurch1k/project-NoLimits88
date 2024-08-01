import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteWaterRecord } from '../../redux/water/operations';

import clsx from 'clsx';
import css from './DeleteWaterModal.module.scss';

const DeleteWaterModal = ({ onClose, idWaterItem }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterRecord(idWaterItem)).unwrap();

      toast.success(t('modals.delete.success'));
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={css.sectionBox}>
      <h2 className={css.title}>{t('modals.delete.title')}</h2>
      <p className={css.quest}>{t('modals.delete.text')}</p>
      <div className={css.boxBtns}>
        <button
          className={clsx(css.btndelete, 'btn-def')}
          type="button"
          onClick={handleDelete}
        >
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
