import { useDispatch } from 'react-redux';

import { deleteContact } from '../../../redux/contacts/operations';

import toast, { Toaster } from 'react-hot-toast';

import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import css from './Contact.module.scss';

const Contact = ({ searchContact }) => {
  const { id, name, number } = searchContact;
  const dispatch = useDispatch();

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('');

  const notify = promise =>
    toast.promise(promise, {
      loading: 'Removal...',
      success: <b>Contact deleted!</b>,
      error: <b>Could not deleted!</b>,
    });

  const handleDelete = () => {
    const myPromise = dispatch(deleteContact(id));
    notify(myPromise);
  };

  return (
    <li className={css.item}>
      <div className={css.body}>
        <p className={css.initials}>{initials}</p>
        <address className={css.address}>
          <p className={css.name} title={name}>
            <FaUser className={css.icon} />
            <span>{name}</span>
          </p>
          <a className={css.tel} title={number} href={`tel:${number}`}>
            <FaPhoneAlt className={css.icon} />
            <span>{number}</span>
          </a>
        </address>
      </div>
      <button className={css.btn} type="button" onClick={handleDelete}>
        Delete
      </button>
      <Toaster position="top-right" reverseOrder={false} />
    </li>
  );
};

export default Contact;
