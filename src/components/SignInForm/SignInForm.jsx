import { useForm } from 'react-hook-form';
import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

const SignInForm = () => {
  const { t } = useTranslation();
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .required(t('signInPage.emailSpanError'))
      .email(t('signInPage.emailSpanError'))
      .test(
        'isValidAfterSign',
        t('signInPage.emailSpanError'),
        function (email) {
          const strAfterEmailSign = email.slice(email.indexOf('@'));
          return (
            !strAfterEmailSign.includes('@') || strAfterEmailSign.includes('.')
          );
        }
      ),
    password: yup
      .string()
      .required(t('signInPage.passwordSpanError'))
      .min(6, t('signInPage.passwordSpanError'))
      .max(28, t('signInPage.passwordSpanError'))
      .matches(/\d/, t('signInPage.passwordSpanError'))
      .matches(/[a-zA-Z]/, t('signInPage.passwordSpanError')),
  });

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

  const onSubmit = async data => {
    const userData = { email: data.email, password: data.password };

    setIsLoader(true);

    try {
      await dispatch(logIn(userData)).unwrap();
      // toast.success('Successfully logged in!');
      reset();
    } catch (error) {
      toast.error('Invalid email and/or password.');
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className={css.signInBody}>
      <h2 className={css.signInTitle}>{t('signInPage.signIn')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={css.signInForm}>
        <label htmlFor={fieldEmailId} className={css.emailLabel}>
          {t('signInPage.email')}
        </label>
        <input
          type="email"
          id={fieldEmailId}
          {...register('email')}
          className={clsx({
            [css.emailInput]: true,
            [css.errorEmailInput]: errors.email,
          })}
          placeholder={t('signInPage.emailPlaceholder')}
        />
        {errors.email && (
          <p className={css.errorMessage}>{errors.email.message}</p>
        )}

        <label htmlFor={fieldPasswordId} className={css.passwordLabel}>
          {t('signInPage.password')}
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
            placeholder={t('signInPage.passwordPlaceholder')}
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
          {isLoader ? (
            <LoaderDetails isPositioning={true} />
          ) : (
            t('signInPage.signIn')
          )}
        </button>
      </form>

      <p className={css.questionText}>
        {t('signInPage.dontAccount')}{' '}
        <Link className={css.signUpLink} to="/signup">
          {t('signInPage.signUp')}
        </Link>
      </p>

      <ToastContainer
        className={css.Toastify}
        position="top-right"
        autoClose={2500}
        hideProgressBar
        closeOnClick
        // rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="slide"
        closeButton={window.innerWidth > 480}
      />
    </div>
  );
};

export default SignInForm;
