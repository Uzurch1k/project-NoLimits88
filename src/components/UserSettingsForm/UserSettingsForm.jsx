import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FaExclamation } from 'react-icons/fa6';
import { FiUpload } from 'react-icons/fi';
import defaultAvatar from '../../img/content/default avatar.png';
import { selectUser } from '../../redux/auth/selectors';
import calculateDailyWaterNorma from '../../helpers/calculateDailyWaterNorma';
import clsx from 'clsx';
import css from './UserSettingsForm.module.scss';

const userSettingsSchema = Yup.object()
  .shape({
    name: Yup.string().required('modals.UserSettingsForm.errors.name'),
    email: Yup.string()
      .email('modals.UserSettingsForm.errors.email')
      .required('modals.UserSettingsForm.errors.email'),
    weight: Yup.number()
      .transform(value => (isNaN(value) ? undefined : value))
      .min(0, 'modals.UserSettingsForm.errors.weight')
      .max(999, 'modals.UserSettingsForm.errors.weight')
      .nullable(),
    amountOfWater: Yup.number()
      .transform(value => (isNaN(value) ? undefined : value))
      .min(0, 'modals.UserSettingsForm.errors.water')
      .max(999, 'modals.UserSettingsForm.errors.water'),
    activeTime: Yup.number()
      .transform(value => (isNaN(value) ? undefined : value))
      .min(0, 'modals.UserSettingsForm.errors.time')
      .max(1440, 'modals.UserSettingsForm.errors.time')
      .nullable(),
  })
  .test('weight-and-active-time', null, function (values) {
    const { weight, activeTime } = values;
    if ((weight && !activeTime) || (!weight && activeTime)) {
      return this.createError({
        path: 'weight',
        message: 'modals.UserSettingsForm.errors.weightAndActiveTime',
      });
    }
    return true;
  });

const UserSettingsForm = ({ onClose }) => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || defaultAvatar);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSettingsSchema),
    defaultValues: {
      ...user,
      gender: user.gender || 'woman',
    },
  });

  const { name, gender, email, weight, amountOfWater, activeTime } = watch();
  const isAnyFieldFilled =
    name || email || weight || amountOfWater || activeTime;

  const dailyWaterNorma = calculateDailyWaterNorma(gender, weight, activeTime);
  const displayWaterNorma = isNaN(dailyWaterNorma) ? '0' : `${dailyWaterNorma}`;

  const handleAvatarUpload = event => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setAvatarUrl(imageUrl);
  };

  const onSubmit = data => {
    console.log(data);
    onClose();
    // код для обробки даних форми
  };

  return (
    <>
      <h2 className={css.title}>{t('modals.UserSettingsForm.setting')}</h2>

      <form className={css.settingsForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.avatarCont}>
          <div className={css.avatarImg}>
            <img src={avatarUrl} alt="" />
          </div>
          <input
            onChange={handleAvatarUpload}
            className={css.avatarInput}
            type="file"
            name="avatar"
            id="avatar"
          />
          <label htmlFor="avatar" className={css.avatarInputLabel}>
            <FiUpload className={css.uplIcon} />
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
                    id="woman"
                    value="woman"
                  />
                  <label
                    className={`${css.text} ${css.genderLabel}`}
                    htmlFor="woman"
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
                    id="man"
                    value="man"
                  />
                  <label
                    className={`${css.text} ${css.genderLabel}`}
                    htmlFor="man"
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
                    <FaExclamation size={18} color="#9BE1A0" />{' '}
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
