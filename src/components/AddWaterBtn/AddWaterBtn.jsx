import css from './AddWaterBtn.module.scss';
import icons from '../../img/icons/icons.svg';

const AddWaterBtn = () => {
  return (
    <button className={css.addWaterBtn} type="submit">
      <svg className={css.addWaterIcn}>
        <use href={`${icons}#plus`}></use>
      </svg>
      <span>Add water</span>
    </button>
  );
};

export default AddWaterBtn;
