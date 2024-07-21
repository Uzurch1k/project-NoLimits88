import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './UserSettingsForm.module.scss';
import { useState } from 'react';
import { FaExclamation } from 'react-icons/fa6';
import { FiUpload } from 'react-icons/fi';

const user = {
  avatarURL: 'path/to/avatar.jpg',
  userName: '',
  userEmail: '',
  userWeight: 0,
  userVolume: 0,
  activityTime: 0,
};

const userSettingsSchema = Yup.object().shape({
  userName: Yup.string().required('The field is required'),
  userEmail: Yup.string()
    .email('Please enter a valid email address (must contain @)')
    .required('Email is required'),
  userWeight: Yup.number()
    .min(0, 'The value must be at least 0')
    .max(999, 'The value must be no more than 3 numbers')
    .required('The field is required'),
  userVolume: Yup.number()
    .min(0, 'The value must be at least 0')
    .max(999, 'The value must be no more than 3 numbers')
    .required('The field is required'),
  activityTime: Yup.number()
    .min(0, 'The value must be at least 0')
    .max(24, 'The value must be no more than 24')
    .required('The field is required'),
});

const UserSettingsForm = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSettingsSchema),
    defaultValues: {
      userName: user.userName || '',
      userEmail: user.userEmail || '',
      userWeight: user.userWeight || 0,
      userVolume: user.userVolume || 0,
      activityTime: user.activityTime || 0,
    },
  });

  const { userName, userEmail, userWeight, userVolume, activityTime } = watch();
  const isAnyFieldFilled =
    userName || userEmail || userWeight || userVolume || activityTime;

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
          <img className={css.avatar} src={avatarUrl} alt="" />
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

        <div className={css.settingsCont}>
          <div className={css.genderCont}>
            <p className={css.settingsTitle}>Your gender identity</p>
            <div>
              <input
                {...register('gender')}
                className={css.genderRadioInput}
                type="radio"
                name="gender"
                id="woman"
                value="Woman"
              />
              <label
                className={`${css.text} ${css.genderLabel}`}
                htmlFor="woman"
              >
                Woman
              </label>
              <input
                {...register('gender')}
                className={css.genderRadioInput}
                type="radio"
                name="gender"
                id="man"
                value="Man"
              />
              <label className={`${css.text} ${css.genderLabel}`} htmlFor="man">
                Man
              </label>
            </div>
          </div>

          <div className={css.settingsBox}>
            <div>
              <div className={css.UserInfoCont}>
                <label className={css.settingsTitleUserInfo} htmlFor="userName">
                  Your name
                </label>
                <input
                  {...register('userName')}
                  className={css.input}
                  type="text"
                  name="userName"
                  id="userName"
                />
                {errors.userName && (
                  <span className={css.errorMessage}>
                    {errors.userName.message}
                  </span>
                )}

                <label
                  className={css.settingsTitleUserInfo}
                  htmlFor="userEmail"
                >
                  Email
                </label>
                <input
                  {...register('userEmail')}
                  className={css.input}
                  type="text"
                  name="userEmail"
                  id="userEmail"
                />
                {errors.userEmail && (
                  <span className={css.errorMessage}>
                    {errors.userEmail.message}
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
                  water norm in liters per day, M is your body weight, T is the
                  time of active sports, or another type of activity
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
                  <label className={css.textWeight} htmlFor="userWeight">
                    Your weight in kilograms:
                  </label>
                  <input
                    {...register('userWeight')}
                    className={css.input}
                    type="number"
                    name="userWeight"
                    id="userWeight"
                  />
                  {errors.userWeight && (
                    <span className={css.errorMessage}>
                      {errors.userWeight.message}
                    </span>
                  )}

                  <label className={css.textWeight} htmlFor="activityTime">
                    The time of active participation in sports:
                  </label>
                  <input
                    {...register('activityTime')}
                    className={css.input}
                    type="number"
                    name="activityTime"
                    id="activityTime"
                  />
                  {errors.activityTime && (
                    <span className={css.errorMessage}>
                      {errors.activityTime.message}
                    </span>
                  )}
                </div>

                <div className={css.waterAmountCont}>
                  <div className={css.waterAmountField}>
                    <p className={css.text}>
                      The required amount of water in liters per day:
                    </p>
                  </div>
                  <label
                    className={css.settingsTitleUserInfo}
                    htmlFor="userVolume"
                  >
                    Write down how much water you will drink:
                  </label>
                  <input
                    {...register('userVolume')}
                    className={css.inputLast}
                    type="number"
                    name="userVolume"
                    id="userVolume"
                  />
                  {errors.userVolume && (
                    <span className={css.errorMessage}>
                      {errors.userVolume.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className={css.settingsButton}
          type="submit"
          disabled={!isAnyFieldFilled}
        >
          Save
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
