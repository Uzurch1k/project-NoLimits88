import css from './SignInForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useRef, useState, useId } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import icons from '../../img/icons/icons.svg';

// const getVisibleAndHiddenPassword = password => {
//   const passwordCharacters = password.split('');
//   const hiddenCharacters = passwordCharacters.map(() => '*').join('');
//   return {
//     hiddenPassword: hiddenCharacters,
//     visiblePassword: password,
//   };
// };

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
    .max(28, 'Password should not have more than 28 characters'),
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

  // const [password, setPassword] = useState('');

  const onSubmit = data => {
    const userData = { email: data.email, password: data.password };

    const loginUser = async () => {
      try {
        const response = await axios.post(
          'https://aquatrack-backend-bmxm.onrender.com/auth/signin',
          userData
        );
        toast.success('Successfully logged in!');
      } catch (error) {
        toast.error(error.response.data.message || 'Login error');
      }
    };

    loginUser();
    reset();
  };

  // useEffect(() => {
  //   const visibleAndHiddenPassword = getVisibleAndHiddenPassword(password);

  //   setValue('password', visibleAndHiddenPassword.hiddenPassword);
  // }, [password, setValue]);

  return (
    <>
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
            type="password"
            id={fieldPasswordId}
            {...register('password')}
            placeholder="Enter your password"
            className={clsx({
              [css.passwordInput]: true,
              [css.errorPasswordInput]: errors.password,
            })}
            data-visible-pwd=""
          />
          <button
            className={css.showPwdBtn}
            onClick={showPasswordToggleHandler}
          >
            <svg width="20" height="20" className={css.eye}>
              <use href={`${icons}#closed-eye`}></use>
            </svg>
          </button>
        </div>
        {errors.password && (
          <p className={css.errorMessage}>{errors.password.message}</p>
        )}
        <button type="submit" className={css.btnSignIn}>
          Sign In
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
        transition:Bounce
        closeButton={window.innerWidth > 480}
      />
    </>
  );
};

export default SignInForm;
