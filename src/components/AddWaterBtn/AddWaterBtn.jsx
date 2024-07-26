import icons from '../../img/icons/icons.svg';
// import css from './AddWaterBtn.module.scss';

const AddWaterBtn = ({ waterClassBtn, openAddWaterModal }) => {
  return (
    <button className={waterClassBtn} type="button" onClick={openAddWaterModal}>
      <div>
        <svg>
          <use href={`${icons}#plus`}></use>
        </svg>
      </div>
      <span>Add water</span>
    </button>
  );
};

export default AddWaterBtn;
