import { useForm } from 'react-hook-form';
import { useState, useId } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { logIn } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';

import clsx from 'clsx';
import css from './SignInForm.module.scss';
import BtnShowPassword from '../BtnShowPassword/BtnShowPassword';
import { LoaderDetails } from '../Loader/Loader';

const loginSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .required('Email is required')
    .email('Invalid email format')
    .test('isValidAfterSign', 'Invalid email format', function (email) {
      const strAfterEmailSign = email.slice(email.indexOf('@'));
      if (strAfterEmailSign.includes('@') === -1) {
        return true;
      } else if (strAfterEmailSign.includes('@') !== -1) {
        return strAfterEmailSign.includes('.');
      }
    }),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should have at least 6 characters')
    .max(28, 'Password should not have more than 28 characters')
    .matches(/\d/, 'The password must contain at least one number')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
});

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      defaultValues: { email: '', password: '' },
    },
  });

  const fieldEmailId = useId();
  const fieldPasswordId = useId();
  const dispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const onSubmit = data => {
    const userData = { email: data.email, password: data.password };

    setIsLoader(true);

    const isLoginSuccessfull = async () => {
      try {
        await dispatch(logIn(userData)).unwrap();
        toast.success('Successfully logged in!');
      } catch (error) {
        toast.error('Login failed');
      } finally {
        setIsLoader(false);
      }
    };
    isLoginSuccessfull();

    reset();
  };

  return (
    <div className={css.signInBody}>
      <h2 className={css.signInTitle}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={css.signInForm}>
        <label htmlFor={fieldEmailId} className={css.emailLabel}>
          Email
        </label>
        <input
          type="email"
          id={fieldEmailId}
          {...register('email')}
          className={clsx({
            [css.emailInput]: true,
            [css.errorEmailInput]: errors.email,
          })}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className={css.errorMessage}>{errors.email.message}</p>
        )}
        <label htmlFor={fieldPasswordId} className={css.passwordLabel}>
          Password
        </label>
        <div
          className={clsx({
            [css.inputPasswordWrapper]: true,
            [css.inputPasswordWrapperError]: errors.password,
          })}
        >
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id={fieldPasswordId}
            {...register('password')}
            placeholder="Enter your password"
            className={clsx({
              [css.passwordInput]: true,
              [css.errorPasswordInput]: errors.password,
            })}
          />
          <BtnShowPassword setIsPasswordVisible={setIsPasswordVisible} />
        </div>
        {errors.password && (
          <p className={css.errorMessage}>{errors.password.message}</p>
        )}
        <button type="submit" className={clsx(css.btnSignIn, 'btn-def')}>
          {isLoader ? <LoaderDetails isPositioning={true} /> : 'Sign In'}
        </button>
      </form>
      <p className={css.questionText}>
        Don&#39;t have an account?{' '}
        <Link className={css.signUpLink} to="/signup">
          Sign Up
        </Link>
      </p>
      <ToastContainer
        className={css.Toastify}
        position="top-right"
        autoClose={2500}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
        closeButton={window.innerWidth > 480}
      />
    </div>
  );
};

export default SignInForm;
