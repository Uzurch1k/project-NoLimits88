import { useDispatch } from 'react-redux';

import { addContact } from '../../redux/contacts/operations';

import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

import clsx from 'clsx';
import css from './ContactForm.module.scss';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Name must be between 3 and 50 digits')
    .max(50, 'Name must be between 3 and 50 digits')
    .required('Required'),
  number: Yup.string()
    .matches(/^[0-9]{3,50}$/, 'Phone number must be between 3 and 50 digits')
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {
  const nameFieldId = nanoid();
  const numberFieldId = nanoid();
  const dispatch = useDispatch();

  const notify = promise =>
    toast.promise(promise, {
      loading: 'Saving...',
      success: <b>Contact added!</b>,
      error: <b>Could not save!</b>,
    });

  const handleSubmit = async (values, actions) => {
    const { name, number } = values;
    const myPromise = dispatch(
      addContact({
        name,
        number,
      })
    );

    actions.resetForm();
    notify(myPromise);
  };

  const handleInputClass = (touched, error) =>
    clsx(css.input, {
      [css.errorInput]: touched && error,
    });

  return (
    <div className={css.wrapp}>
      <Formik
        initialValues={initialValues}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.formbody}>
              <div>
                <label className={css.label} htmlFor={nameFieldId}>
                  Name
                </label>
                <Field
                  className={handleInputClass(touched.name, errors.name)}
                  name="name"
                  id={nameFieldId}
                  placeholder="Name..."
                />
                <ErrorMessage className={css.error} name="name" component="p" />
              </div>

              <div>
                <label className={css.label} htmlFor={numberFieldId}>
                  Number
                </label>
                <Field
                  className={handleInputClass(touched.number, errors.number)}
                  type="number"
                  name="number"
                  id={numberFieldId}
                  placeholder="Number..."
                />
                <ErrorMessage
                  className={css.error}
                  name="number"
                  component="p"
                />
              </div>
            </div>

            <button className={css.btn} type="submit">
              Add contact
            </button>
          </Form>
        )}
      </Formik>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ContactForm;
