import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseModal from '../BaseModal/BaseModal';
import clsx from 'clsx';
import css from './DeleteWaterModal.module.scss';

// import { deleteWaterEntry } from '../redux'; * дія в редаксі для видалення
// import { updateWaterProgressBar, updateWaterList, updateCalendar } from '../redux' * дія в редаксі для оновлення
import { logOut } from '../../redux/auth/operations'; // скопійовано з LogOutModal, щоб не вибивало помилок за відсутності редаксу, потім видалити!

const DeleteWaterModal = ({ isOpen, onClose, entryId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    //   try {
    //     const response = await dispatch(deleteWaterEntry(entryId));

    //     if (response.error) {
    //       throw new Error(response.error);
    //     }

    //     dispatch(updateWaterProgressBar());
    //     dispatch(updateWaterList());
    //     dispatch(updateCalendar());

    //     onClose();
    //   } catch (err) {
    //     toast.error(err.message);
    //   }

    // скопійовано з LogOutModal, щоб не вибивало помилок за відсутності редаксу, потім видалити!
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      dispatch({ type: 'CLEAR_STORE' });
      localStorage.clear();
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      classSectionBox={css.sectionBox}
    >
      <h2 className={css.title}>Delete entry</h2>
      <p className={css.quest}>Are you sure you want to delete the entry?</p>
      <div className={css.boxBtns}>
        <button
          className={clsx(css.btndelete, 'btn-def')}
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className={clsx(css.btncancel, 'btn-def')}
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      <ToastContainer />
    </BaseModal>
  );
};

export default DeleteWaterModal;
