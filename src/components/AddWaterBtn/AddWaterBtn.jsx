import icons from '../../img/icons/symbol.svg';
// import css from './AddWaterBtn.module.scss';

const AddWaterBtn = ({ waterClassBtn, openAddWaterModal }) => {
  return (
    <button className={waterClassBtn} type="button" onClick={openAddWaterModal}>
      <div>
        <svg>
          <use href={`${icons}#icon-plus`}></use>
        </svg>
      </div>
      <span>Add water</span>
    </button>
  );
};

export default AddWaterBtn;
