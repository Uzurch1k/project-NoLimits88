import { useTranslation } from 'react-i18next';
import css from './WaterItem.module.scss';
import icons from '../../img/icons/symbol.svg';

const WaterItem = ({ openEditWaterModal, openDeleteWaterModal, amount }) => {
  const { t } = useTranslation();
import { litersToMilliliters } from '../../helpers/litersToMilliliters';
import { formatTime } from '../../helpers/formatTime';

import css from './WaterItem.module.scss';
import icons from '../../img/icons/symbol.svg';

const WaterItem = ({
  openEditWaterModal,
  openDeleteWaterModal,
  searchWaterItem,
  setIdWaterItem,
}) => {
  const { _id, amount, date } = searchWaterItem;

  const handleOnClick = () => {
    openDeleteWaterModal();
    setIdWaterItem(_id);
  };

  return (
    <li className={css.waterItem}>
      <div className={css.iconWaterWrapp}>
        <svg className={css.iconWater} width="38" height="38">
          <use href={`${icons}#icon-glass`}></use>
        </svg>
      </div>

      <div className={css.waterInfo}>
        <p className={css.waterAmount}>{litersToMilliliters(amount)} ml</p>
        <p className={css.waterTime}>{formatTime(date)}</p>
      </div>

      <div className={css.buttonsBox}>
        <button
          className={css.editBtn}
          onClick={openEditWaterModal}
          aria-label="Edit the entered amount of water"
        >
          <svg className={css.iconAction} width="14" height="14">
            <use href={`${icons}#icon-edit`}></use>
          </svg>
        </button>

        <button
          className={css.deleteBtn}
          onClick={handleOnClick}
          aria-label="Delete the entered amount of water"
        >
          <svg className={css.iconAction} width="14" height="14">
            <use href={`${icons}#icon-trash`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default WaterItem;
