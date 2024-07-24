import React, { useState } from 'react';
import { registerUser } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import css from './SignUpForm.module.scss';
import clsx from 'clsx';
import { LoaderDetails } from '../Loader/Loader';
import BtnShowPassword from '../BtnShowPassword/BtnShowPassword';

const schema = yup.object().shape({
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
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async data => {
    const userData = { email: data.email, password: data.password };

    setIsLoader(true);

    const isLoginSuccessfull = async () => {
      try {
        const response = await dispatch(registerUser(userData));
        if (response.error) throw new Error(response.payload);
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
      <h2 className={css.signupTitle}>Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={css.signupForm}>
        <div className={css.signupFormGroup}>
          <label className={css.signupLabel} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            {...register('email')}
            className={`${css.signupField} ${
              errors.email ? css.signUpErrorField : ''
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className={css.signupError}>{errors.email.message}</p>
        )}
        <div className={css.signupFormGroup}>
          <label className={css.signupLabel} htmlFor="password">
            Password
          </label>
          <div className={css.signupIconEyes}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`${css.signupField} ${
                errors.password ? css.signUpErrorField : ''
              }`}
              placeholder="Enter your password"
            />
            <BtnShowPassword setIsPasswordVisible={setShowPassword} />
          </div>
        </div>
        {errors.password && (
          <p className={css.signupError}>{errors.password.message}</p>
        )}
        <div className={css.signupFormGroup}>
          <label className={css.signupLabel} htmlFor="repeatPassword">
            Repeat Password
          </label>
          <div className={css.signupIconEyes}>
            <input
              id="repeatPassword"
              type={showRepeatPassword ? 'text' : 'password'}
              {...register('repeatPassword')}
              className={`${css.signupField} ${
                errors.repeatPassword ? css.signUpErrorField : ''
              }`}
              placeholder="Repeat password"
            />
            <BtnShowPassword setIsPasswordVisible={setShowRepeatPassword} />
          </div>
        </div>
        {errors.repeatPassword && (
          <p className={css.signupError}>{errors.repeatPassword.message}</p>
        )}
        <button className={clsx(css.signupButton, 'btn-def')} type="submit">
          {isLoader ? <LoaderDetails isPositioning={true} /> : 'Sign Up'}
        </button>
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
      </form>
      <p className={css.questionText}>
        Already have account?{' '}
        <Link className={css.signInLink} to="/signin">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
