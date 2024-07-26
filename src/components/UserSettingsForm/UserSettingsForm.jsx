import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './UserSettingsForm.module.scss';
import { useState } from 'react';
import { FaExclamation } from 'react-icons/fa6';
import { FiUpload } from 'react-icons/fi';
import clsx from 'clsx';
import calculateDailyWaterNorma from '../../helpers/calculateDailyWaterNorma';
import defaultAvatar from '../../img/content/default avatar.png';
/*import icons from '../../img/icons/symbol.svg'*/

const userSettingsSchema = Yup.object().shape({
  name: Yup.string().required('The field is required'),
  email: Yup.string()
    .email('Please enter a valid email address (must contain @)')
    .required('Email is required'),
  weight: Yup.number()
    .min(0, 'The value must be at least 0')
    .max(999, 'The value must be no more than 3 numbers')
    .required('The field is required'),
  amountOfWater: Yup.number()
    .min(0, 'The value must be at least 0')
    .max(999, 'The value must be no more than 3 numbers')
    .required('The field is required'),
  activeTime: Yup.number()
    .min(0, 'The value must be at least 0')
    .max(1440, 'The value must be no more than 1440 minutes (24 hours)')
    .required('The field is required'),
});

const UserSettingsForm = () => {
  const user = useSelector(selectUser);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || defaultAvatar);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSettingsSchema),
    defaultValues: user,
  });

  const { name, gender, email, weight, amountOfWater, activeTime } = watch();
  const isAnyFieldFilled =
    name || email || weight || amountOfWater || activeTime;

  const dailyWaterNorma = calculateDailyWaterNorma(gender, weight, activeTime);
  const displayWaterNorma = isNaN(dailyWaterNorma)
    ? ''
    : `${dailyWaterNorma} L`;

  const handleAvatarUpload = event => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setAvatarUrl(imageUrl);
  };

  const onSubmit = data => {
    console.log(data);
    // код для обробки даних форми
  };

  return (
    <>
      <h2 className={css.title}>Setting</h2>

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
            Upload a photo
          </label>
        </div>
        <div className={css.scroll}>
          <div className={css.settingsCont}>
            <div className={css.genderCont}>
              <p className={css.settingsTitle}>Your gender identity</p>
              <div className={css.genderWrapper}>
                <div>
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
                    Woman
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
                    Man
                  </label>
                </div>
              </div>
            </div>

            <div className={css.settingsBox}>
              <div>
                <div className={css.UserInfoCont}>
                  <label className={css.settingsTitleUserInfo} htmlFor="name">
                    Your name
                  </label>
                  <input
                    {...register('name')}
                    className={css.input}
                    type="text"
                    name="name"
                    id="name"
                  />
                  {errors.name && (
                    <span className={css.errorMessage}>
                      {errors.name.message}
                    </span>
                  )}

                  <label className={css.settingsTitleUserInfo} htmlFor="email">
                    Email
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
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className={css.normaCont}>
                  <p className={css.settingsTitle}>My daily norma</p>
                  <div className={css.formulaCont}>
                    <div className={css.formulaWrap}>
                      <p className={css.text}>For woman:</p>
                      <span className={`${css.text} ${css.normaFormula}`}>
                        V=(M*0,03) + (T*0,4)
                      </span>
                    </div>
                    <div className={css.formulaWrap}>
                      <p className={css.text}>For man:</p>
                      <span className={`${css.text} ${css.normaFormula}`}>
                        V=(M*0,04) + (T*0,6)
                      </span>
                    </div>
                  </div>
                  <p className={css.normaTextArea}>
                    <span className={css.figure}>*</span> V is the volume of the
                    water norm in liters per day, M is your body weight, T is
                    the time of active sports, or another type of activity
                    commensurate in terms of loads (in the absence of these, you
                    must set 0)
                  </p>
                  <span className={`${css.text} ${css.activeTime}`}>
                    <FaExclamation size={18} color="#9BE1A0" /> Active time in
                    hours
                  </span>
                </div>
              </div>

              <div>
                <div className={css.desktopWeight}>
                  <div className={css.metricsWrapper}>
                    <label className={css.textWeightFormula} htmlFor="weight">
                      Your weight in kilograms:
                    </label>
                    <input
                      {...register('weight')}
                      className={css.input}
                      type="number"
                      name="weight"
                      id="weight"
                    />
                    {errors.weight && (
                      <span className={css.errorMessage}>
                        {errors.weight.message}
                      </span>
                    )}

                    <label
                      className={css.textWeightFormula}
                      htmlFor="activeTime"
                    >
                      The time of active participation in sports:
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
                        {errors.activeTime.message}
                      </span>
                    )}
                  </div>

                  <div className={css.waterAmountCont}>
                    <div className={css.waterAmountField}>
                      <p className={css.text}>
                        The required amount of water in liters per day:
                      </p>
                      <span className={css.waterNorma}>
                        {displayWaterNorma}
                      </span>
                    </div>
                    <label
                      className={css.settingsTitleUserInfo}
                      htmlFor="amountOfWater"
                    >
                      Write down how much water you will drink:
                    </label>
                    <input
                      {...register('amountOfWater')}
                      className={css.inputLast}
                      type="number"
                      name="amountOfWater"
                      id="amountOfWater"
                      step="0.1"
                    />
                    {errors.amountOfWater && (
                      <span className={css.errorMessage}>
                        {errors.amountOfWater.message}
                      </span>
                    )}
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
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default UserSettingsForm;
