import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
/*import { FaPlus, FaMinus } from 'react-icons/fa';*/
import css from './WaterForm.module.scss';
import icons from '../../img/icons/symbol.svg'

const validationSchema = Yup.object().shape({
  waterAmount: Yup.number()
    .min(50, 'The amount must be at least 50ml')
    .max(5000, 'The amount of water must be less than 5000 ml')
    .required('Water amount is required'),
  time: Yup.string().required('Time is required'),
});

const WaterForm = ({ initialData = {}, onSubmit }) => {
  const defaultValues = {
    waterAmount: initialData.waterAmount || 50,
    time:
      initialData.time ||
      new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const mlToDecimal = ml => {
    return parseFloat((ml / 1000).toFixed(3));
  };

  const handleWaterChange = newValue => {
    setValue('waterAmount', newValue);
  };

  const incrementWater = () => {
    const currentAmount = Number(getValues('waterAmount'));
    const newValue = currentAmount + 50;
    if (newValue <= 5000) {
      handleWaterChange(newValue);
    }
  };

  const decrementWater = () => {
    const currentAmount = Number(getValues('waterAmount'));
    if (currentAmount >= 50) {
      const newValue = currentAmount - 50;
      handleWaterChange(newValue);
    }
  };

  const handleKeyboardAmountChange = e => {
    const newValue = Number(e.target.value);
    if (e.target.value.length <= 5 && newValue >= 50 && newValue <= 5000) {
      handleWaterChange(newValue);
    }
  };

  const onSubmitHandler = data => {
    const [hours, minutes] = data.time.split(':');
    const fullDateTime = `${
      new Date().toISOString().split('T')[0]
    }T${hours}:${minutes}:00.000Z`;

    const newEntry = {
      amount: mlToDecimal(data.waterAmount),
      date: new Date(fullDateTime).toISOString(),
    };

    onSubmit(newEntry);
  };

  return (
    <form className={css.waterForm} onSubmit={handleSubmit(onSubmitHandler)}>
      <p className={css.text}>Amount of water</p>
      <div className={css.counterContainer}>
        <button
          type="button"
          className={css.decrementButton}
          onClick={decrementWater}
        >
          <svg className={css.icon}>
  <use href={`${icons}#icon-minus-amount`}></use>
</svg>
        </button>
        <div className={css.inputWrapper}>
          <input
            {...register('waterAmount')}
            type="number"
            className={css.waterAmountInput}
            onChange={handleKeyboardAmountChange}
            min="50"
          />
          <span className={css.mlText}>ml</span>
        </div>
        <button
          type="button"
          className={css.incrementButton}
          onClick={incrementWater}
        >
          <svg className={css.icon}>
  <use href={`${icons}#icon-plus-amount`}></use>
</svg>
        </button>
      </div>
      {errors.waterAmount && (
        <span className={css.errorMessage}>{errors.waterAmount.message}</span>
      )}
      <div className={css.inputContainer}>
        <label htmlFor="time" className={css.text}>
          Recording time:
        </label>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <input className={css.input} {...field} type="time" id="time" />
          )}
        />
        {errors.time && (
          <span className={css.errorMessage}>{errors.time.message}</span>
        )}
      </div>
      <div className={css.inputContainer}>
        <label htmlFor="waterAmountKeyboard">
          Enter the value of the water used:
        </label>
        <div className={css.inputWrapper}>
          <input
            className={css.input}
            {...register('waterAmount')}
            type="number"
            id="waterAmountKeyboard"
            min="50"
            onChange={handleKeyboardAmountChange}
          />
          <span className={css.mlText}>ml</span>
        </div>
        {errors.waterAmount && (
          <span className={css.errorMessage}>{errors.waterAmount.message}</span>
        )}
      </div>
      <button className={clsx(css.settingsButton, 'btn-def')} type="submit">
        Save
      </button>
    </form>
  );
};

export default WaterForm;
