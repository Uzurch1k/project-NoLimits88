import { useTranslation } from 'react-i18next';
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

const SignUpForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(t('signUpPage.emailSpanError'))
          .email(t('signUpPage.emailSpanError'))
          .test(
            'isValidAfterSign',
            t('signUpPage.emailSpanError'),
            function (email) {
              const strAfterEmailSign = email.slice(email.indexOf('@'));
              return (
                !strAfterEmailSign.includes('@') ||
                strAfterEmailSign.includes('.')
              );
            }
          ),
        password: yup
          .string()
          .required(t('signUpPage.passwordSpanError'))
          .min(6, t('signUpPage.passwordSpanError'))
          .max(28, t('signUpPage.passwordSpanError'))
          .matches(/\d/, t('signUpPage.passwordSpanError'))
          .matches(/[a-zA-Z]/, t('signUpPage.passwordSpanError')),
        repeatPassword: yup
          .string()
          .oneOf(
            [yup.ref('password'), null],
            t('signUpPage.repeatPasswordpanErrorTwo')
          )
          .required(t('signUpPage.repeatPasswordpanError')),
      })
    ),
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
      toast.success(t('signUpPage.registrationSuccess'));
    } catch (error) {
      toast.error(t('signUpPage.registrationFailed'));
    } finally {
      setIsLoader(false);
    }

    reset();
  };

  return (
    <div className={css.signUpBody}>
      <h2 className={css.signUpTitle}>{t('signUpPage.signUp')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={css.signUpForm}>
        <label htmlFor={fieldEmailId} className={css.emailLabel}>
          {t('signUpPage.email')}
        </label>
        <input
          type="email"
          id={fieldEmailId}
          {...register('email')}
          className={clsx({
            [css.emailInput]: true,
            [css.errorEmailInput]: errors.email,
          })}
          placeholder={t('signUpPage.emailPlaceholder')}
        />
        {errors.email && (
          <p className={css.errorMessage}>{errors.email.message}</p>
        )}

        <label htmlFor={fieldPasswordId} className={css.passwordLabel}>
          {t('signUpPage.password')}
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
            placeholder={t('signUpPage.passwordPlaceholder')}
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
          {t('signUpPage.repeatPassword')}
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
            placeholder={t('signUpPage.repeatPasswordPlaceholder')}
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
          {isLoader ? (
            <LoaderDetails isPositioning={true} />
          ) : (
            t('signUpPage.signUp')
          )}
        </button>
      </form>

      <p className={css.questionText}>
        {t('signUpPage.textAlready')}{' '}
        <Link className={css.signInLink} to="/signin">
          {t('signUpPage.signIn')}
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
