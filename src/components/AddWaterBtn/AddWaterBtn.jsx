import { useTranslation } from 'react-i18next';
import icons from '../../img/icons/symbol.svg';
// import css from './AddWaterBtn.module.scss';

const AddWaterBtn = ({ waterClassBtn, openAddWaterModal }) => {
  const { t } = useTranslation();
  return (
    <button className={waterClassBtn} type="button" onClick={openAddWaterModal}>
      <div>
        <svg>
          <use href={`${icons}#icon-plus`}></use>
        </svg>
      </div>
      <span>{t('waterMainInfo.btn')}</span>
    </button>
  );
};

export default AddWaterBtn;
