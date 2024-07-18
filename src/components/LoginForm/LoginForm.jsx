import { useDispatch } from 'react-redux';

import { logIn } from '../../redux/auth/operations';

import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

import { FiLogIn } from 'react-icons/fi';

import clsx from 'clsx';
import css from './LoginForm.module.scss';

const FeedbackSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters')
    .required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const emailFieldId = nanoid();
  const passwordFieldId = nanoid();
  const dispatch = useDispatch();

  const notify = promise =>
    toast.promise(promise, {
      loading: 'Saving...',
      success: <b>Login successful!</b>,
      error: <b>Login failed!</b>,
    });

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;
    const myPromise = dispatch(
      logIn({
        email,
        password,
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
    <div className={css.login}>
      <div className={css.login}>
        <Formik
          initialValues={initialValues}
          validationSchema={FeedbackSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.form}>
              <div className={css.formbody}>
                <div>
                  <label className={css.label} htmlFor={emailFieldId}>
                    Email
                  </label>
                  <Field
                    className={handleInputClass(touched.email, errors.email)}
                    type="email"
                    name="email"
                    id={emailFieldId}
                    placeholder="Email..."
                  />
                  <ErrorMessage
                    className={css.error}
                    name="email"
                    component="p"
                  />
                </div>

                <div>
                  <label className={css.label} htmlFor={passwordFieldId}>
                    Password
                  </label>
                  <Field
                    className={handleInputClass(
                      touched.password,
                      errors.password
                    )}
                    type="password"
                    name="password"
                    id={passwordFieldId}
                    placeholder="Password..."
                  />
                  <ErrorMessage
                    className={css.error}
                    name="password"
                    component="p"
                  />
                </div>
              </div>

              <button className={css.btn} type="submit">
                <span>Log In</span>
                <FiLogIn />
              </button>
            </Form>
          )}
        </Formik>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default LoginForm;
