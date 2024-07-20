import css from './SignInForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

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
    .email('Invalid email format'),
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
    setValue,
    getValues,
    watch,
    setError,
    getFieldState,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      defaultValues: { email: '', password: '' },
    },
  });
  // const [password, setPassword] = useState('');

  const onSubmit = data => {
    console.log(data);
  };

  // useEffect(() => {
  //   const visibleAndHiddenPassword = getVisibleAndHiddenPassword(password);

  //   setValue('password', visibleAndHiddenPassword.hiddenPassword);
  // }, [password, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.signInForm}>
      <label htmlFor="email" className={css.emailLabel}>
        Email
      </label>
      <input
        type="email"
        id="email"
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
      <label htmlFor="password" className={css.passwordLabel}>
        Password
      </label>
      <input
        type="text"
        id="password"
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
  );
};

export default SignInForm;
