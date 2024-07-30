import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { selectUser } from '../../redux/auth/selectors';
import { updateUser } from '../../redux/auth/operations';

import calculateDailyWaterNorma from '../../helpers/calculateDailyWaterNorma';

import avaDef from '../../img/content/ava-def.png';
import icons from '../../img/icons/symbol.svg';

import clsx from 'clsx';
import css from './UserSettingsForm.module.scss';

const userSettingsSchema = Yup.object().shape({
  name: Yup.string().required('The field is required'),
  email: Yup.string()
    .email('Please enter a valid email address (must contain @)')
    .required('Email is required'),
  weight: Yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .min(0, 'The value must be at least 0')
    .max(999, 'The value must be no more than 3 numbers')
    .nullable(),
  amountOfWater: Yup.number()
    .typeError('Amount of water should be a number')
    .min(0, 'The value must be at least 0')
    .max(999, 'The value must be no more than 3 numbers')
    .nullable(),
  activeTime: Yup.number()
    .typeError('Active time must be a number')
    .min(0, 'The value must be at least 0')
    .max(1440, 'The value must be no more than 1440 minutes')
    .nullable(),
  gender: Yup.string()
    .oneOf(['Woman', 'Man'], 'Gender must be either Woman or Man')
    .required('Gender is required'),
});

/* .test('weight-and-active-time', null, function (values) {
    const { weight, activeTime } = values;
    if ((weight || activeTime) && (!weight || !activeTime)) {
      return this.createError({
        path: 'weight',
        message: 'modals.UserSettingsForm.errors.weightAndActiveTime',
      });
    }
    return true;
  })*/

const UserSettingsForm = ({ onClose }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [photoUrl, setPhotoUrl] = useState(user?.photo);
  const [photoFile, setPhotoFile] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSettingsSchema),
    defaultValues: {
      ...user,
      gender: user.gender || 'Woman',
      weight: user.weight || '0',
      activeTime: user.activeTime || '0',
      amountOfWater: user.amountOfWater || '0',
    },
    mode: 'onChange',
  });

  const { name, gender, email, weight, amountOfWater, activeTime, photo } =
    watch();
  const isAnyFieldFilled =
    name || email || weight || amountOfWater || activeTime || photo;

  const dailyWaterNorma = calculateDailyWaterNorma(gender, weight, activeTime);
  const displayWaterNorma = isNaN(dailyWaterNorma) ? '0' : `${dailyWaterNorma}`;

  const handlePhotoUpload = event => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPhotoUrl(imageUrl);
    setPhotoFile(file);
  };

  const handleNumberInput = (event, maxLength) => {
    const value = event.target.value;
    if (value.length > maxLength) {
      event.target.value = value.slice(0, maxLength);
    }
  };

  const onSubmit = async data => {
    const formData = new FormData();
    formData.append('name', data.name.trim());
    formData.append('email', data.email.trim());
    formData.append('weight', data.weight);
    formData.append('amountOfWater', data.amountOfWater);
    formData.append('activeTime', data.activeTime);
    formData.append('gender', data.gender);
    if (photoFile) {
      formData.append('photo', photoFile);
    }

    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        toast.success('User data updated successfully!');
        onClose();
      })
      .catch(() => {
        toast.error('Failed to update user data.');
      });
  };

  return (
    <>
      <h2 className={css.title}>{t('modals.UserSettingsForm.setting')}</h2>

      <form className={css.settingsForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.avatarCont}>
          <div className={css.avatarImg}>
            {photoUrl ? (
              <img src={photoUrl} alt="" />
            ) : (
              <img src={avaDef} alt="" />
            )}
          </div>
          <input
            onChange={handlePhotoUpload}
            className={css.avatarInput}
            type="file"
            name="photo"
            id="photo"
          />
          <label htmlFor="photo" className={css.avatarInputLabel}>
            <svg className={css.uplIcon} width="18" height="18">
              <use href={`${icons}#icon-upload`}></use>
            </svg>
            {t('modals.UserSettingsForm.uploadPhotoBtn')}
          </label>
        </div>

        <div className={css.scroll}>
          <div className={css.settingsCont}>
            <div className={css.genderCont}>
              <p className={css.settingsTitle}>
                {t('modals.UserSettingsForm.yourGenderLabel')}
              </p>
              <div className={css.genderWrapper}>
                <div className={css.genderWrapper}>
                  <input
                    {...register('gender')}
                    className={css.genderRadioInput}
                    type="radio"
                    name="gender"
                    id="Woman"
                    value="Woman"
                  />
                  <label
                    className={`${css.text} ${css.genderLabel}`}
                    htmlFor="Woman"
                  >
                    {t('modals.UserSettingsForm.femaleGenderLabel')}
                  </label>
                </div>
                <div>
                  <input
                    {...register('gender')}
                    className={css.genderRadioInput}
                    type="radio"
                    name="gender"
                    id="Man"
                    value="Man"
                  />
                  <label
                    className={`${css.text} ${css.genderLabel}`}
                    htmlFor="Man"
                  >
                    {t('modals.UserSettingsForm.femaleGenderMale')}
                  </label>
                </div>
              </div>
            </div>

            <div className={css.settingsBox}>
              <div>
                <div className={css.UserInfoCont}>
                  <label className={css.settingsTitleUserInfo} htmlFor="name">
                    {t('modals.UserSettingsForm.yourNameLabel')}
                  </label>
                  <input
                    {...register('name')}
                    className={css.inputFirst}
                    type="text"
                    name="name"
                    id="name"
                  />
                  {errors.name && (
                    <span className={css.errorMessage}>
                      {t(errors.name.message)}
                    </span>
                  )}

                  <label className={css.settingsTitleUserInfo} htmlFor="email">
                    {t('modals.UserSettingsForm.labelEmail')}
                  </label>
                  <input
                    {...register('email')}
                    className={css.input}
                    type="text"
                    name="email"
                    id="email"
                  />
                  {errors.email && (
                    <span className={css.errorMessage}>
                      {t(errors.email.message)}
                    </span>
                  )}
                </div>

                <div className={css.normaCont}>
                  <p className={css.settingsTitle}>
                    {t('modals.UserSettingsForm.dailyNormah')}
                  </p>
                  <div className={css.formulaCont}>
                    <div className={css.formulaWrapOne}>
                      <p className={css.textInNorma}>
                        {t('modals.UserSettingsForm.forWomanP')}
                      </p>
                      <span className={`${css.text} ${css.normaFormula}`}>
                        V=(M*0,03) + (T*0,4)
                      </span>
                    </div>
                    <div className={css.formulaWrapTwo}>
                      <p className={css.textInNorma}>
                        {t('modals.UserSettingsForm.forManP')}
                      </p>
                      <span className={`${css.text} ${css.normaFormula}`}>
                        V=(M*0,04) + (T*0,6)
                      </span>
                    </div>
                  </div>
                  <p className={css.normaTextArea}>
                    <span className={css.figure}>*</span>{' '}
                    {t('modals.UserSettingsForm.starText')}
                  </p>
                  <span className={`${css.text} ${css.activeTime}`}>
                    <svg className={css.exclamationIcon} width="22" height="22">
                      <use href={`${icons}#icon-exclamation`}></use>
                    </svg>
                    {t('modals.UserSettingsForm.activeText')}
                  </span>
                </div>
              </div>

              <div>
                <div className={css.desktopWeight}>
                  <div className={css.metricsWrapper}>
                    <label className={css.textWeightFormula} htmlFor="weight">
                      {t('modals.UserSettingsForm.infoUser')}
                    </label>
                    <input
                      {...register('weight')}
                      className={css.inputWeight}
                      type="number"
                      name="weight"
                      id="weight"
                      onInput={e => handleNumberInput(e, 4)}
                    />
                    {errors.weight && (
                      <span className={css.errorMessage}>
                        {t(errors.weight.message)}
                      </span>
                    )}

                    <label
                      className={css.textWeightFormula}
                      htmlFor="activeTime"
                    >
                      {t('modals.UserSettingsForm.TheTimeSportsLabel')}
                    </label>
                    <input
                      {...register('activeTime')}
                      className={css.input}
                      type="number"
                      name="activeTime"
                      id="activeTime"
                      onInput={e => handleNumberInput(e, 5)}
                      step="0.1"
                    />
                    {errors.activeTime && (
                      <span className={css.errorMessage}>
                        {t(errors.activeTime.message)}
                      </span>
                    )}
                  </div>

                  <div className={css.waterAmountCont}>
                    <div className={css.waterAmountField}>
                      <p className={css.textWaterAmount}>
                        {t('modals.UserSettingsForm.requiredWater')}
                      </p>
                      <span className={css.waterNorma}>
                        {displayWaterNorma} {t('modals.UserSettingsForm.l')}
                      </span>
                    </div>
                    <label
                      className={css.settingsTitleUserInfo}
                      htmlFor="amountOfWater"
                    >
                      {t('modals.UserSettingsForm.writeDownLabel')}
                    </label>
                    <input
                      {...register('amountOfWater')}
                      className={css.inputAnount}
                      type="number"
                      name="amountOfWater"
                      id="amountOfWater"
                      step="0.1"
                    />
                    {errors.amountOfWater && (
                      <span className={css.errorMessage}>
                        {t(errors.amountOfWater.message)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className={clsx(css.settingsButton, 'btn-def')}
          type="submit"
          disabled={!isAnyFieldFilled}
        >
          {t('modals.UserSettingsForm.saveBtn')}
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
