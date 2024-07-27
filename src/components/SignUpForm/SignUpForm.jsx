import { useForm } from 'react-hook-form';
import { useState, useId } from 'react';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { registerUser } from '../../redux/auth/operations';
import { LoaderDetails } from '../Loader/Loader';

import BtnShowPassword from '../BtnShowPassword/BtnShowPassword';

import css from './SignUpForm.module.scss';
import clsx from 'clsx';

const loginSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .required('Email is required')
    .email('Invalid email format')
    .test('isValidAfterSign', 'Invalid email format', function (email) {
      const strAfterEmailSign = email.slice(email.indexOf('@'));
      return (
        !strAfterEmailSign.includes('@') || strAfterEmailSign.includes('.')
      );
    }),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should have at least 6 characters')
    .max(28, 'Password should not have more than 28 characters')
    .matches(/\d/, 'The password must contain at least one number')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '', repeatPassword: '' },
  });

  const fieldEmailId = useId();
  const fieldPasswordId = useId();
  const fieldRepeatPasswordId = useId();
  const dispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const onSubmit = async data => {
    const username = data.email ? data.email.split('@')[0] : 'User';

    const userData = {
      name: username,
      email: data.email,
      password: data.password,
    };

    setIsLoader(true);

    try {
      const response = await dispatch(registerUser(userData));
      if (response.error) throw new Error(response.payload);
      toast.success('Successfully registered!');
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setIsLoader(false);
    }

    reset();
  };

  return (
    <div className={css.signUpBody}>
      <h2 className={css.signUpTitle}>Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={css.signUpForm}>
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

        <label htmlFor={fieldRepeatPasswordId} className={css.passwordLabel}>
          Repeat Password
        </label>
        <div
          className={clsx({
            [css.inputPasswordWrapper]: true,
            [css.inputPasswordWrapperError]: errors.repeatPassword,
          })}
        >
          <input
            type={isRepeatPasswordVisible ? 'text' : 'password'}
            id={fieldRepeatPasswordId}
            {...register('repeatPassword')}
            placeholder="Repeat your password"
            className={clsx({
              [css.passwordInput]: true,
              [css.errorPasswordInput]: errors.repeatPassword,
            })}
          />
          <BtnShowPassword setIsPasswordVisible={setIsRepeatPasswordVisible} />
        </div>
        {errors.repeatPassword && (
          <p className={css.errorMessage}>{errors.repeatPassword.message}</p>
        )}

        <button className={clsx(css.btnSignUp, 'btn-def')} type="submit">
          {isLoader ? <LoaderDetails isPositioning={true} /> : 'Sign Up'}
        </button>
      </form>

      <p className={css.questionText}>
        Already have an account?{' '}
        <Link className={css.signInLink} to="/signin">
          Sign In
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
        transition="slide"
        closeButton={window.innerWidth > 480}
      />
    </div>
  );
};

export default SignUpForm;
