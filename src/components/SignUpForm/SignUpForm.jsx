import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import css from './SignUpForm.module.scss';
import icons from '../../img/icons/icons.svg';
import clsx from 'clsx';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/\d/, 'The password must contain at least one number')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters')
    .required('Password is required'),
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const onSubmit = async data => {
    try {
      const response = await axios.post('/api/register', data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      toast.success('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/tracker');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
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
          {errors.email && (
            <span className={css.signupError}>{errors.email.message}</span>
          )}
        </div>
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
            <div
              className={css.signupIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg className={css.icon}>
                <use
                  href={`${icons}${
                    showPassword ? '#icon-eye' : '#icon-eye-close'
                  }`}
                />
              </svg>
            </div>
          </div>
          {errors.password && (
            <span className={css.signupError}>{errors.password.message}</span>
          )}
        </div>
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
            <div
              className={css.signupIcon}
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              <svg className={css.icon}>
                <use
                  href={`${icons}${
                    showRepeatPassword ? '#icon-eye' : '#icon-eye-close'
                  }`}
                />
              </svg>
            </div>
          </div>
          {errors.repeatPassword && (
            <span className={css.signupError}>
              {errors.repeatPassword.message}
            </span>
          )}
        </div>
        <button className={clsx(css.signupButton, 'btn-def')} type="submit">
          Sign Up
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default SignUpForm;
