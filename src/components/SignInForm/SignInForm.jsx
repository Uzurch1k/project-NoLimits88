import css from './SignInForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useRef, useState, useId } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    // dispatch(login(userData))
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
    </>
  );
};

export default SignInForm;
