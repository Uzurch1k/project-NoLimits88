import css from './WaterItem.module.scss';
import icons from '../../img/icons/symbol.svg';

const WaterItem = () => {
  return (
    <li className={css.water_item_content}>
      <svg className={css.icon_water_glass} width="38" height="38">
        <use href={`${icons}#icon-glass`}></use>
      </svg>

      <div className={css.water_info}>
        <p className={css.water_amount}>Amount</p>
        <p className={css.water_time}>Time</p>
      </div>
      <div className={css.container_buttons}>
        <button
          className={css.editBtn}
          // onClick={openModalEdit}
          aria-label="Edit the entered amount of water"
        >
          <svg className={css.icon_action} width="14" height="14">
            <use href={`${icons}#icon-edit`}></use>
          </svg>
        </button>
        <button
          className={css.deleteBtn}
          // onClick={openModalDelete}
          aria-label="Delete the entered amount of water"
        >
          <svg className={css.icon_action} width="14" height="14">
            <use href={`${icons}#icon-trash`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default WaterItem;
