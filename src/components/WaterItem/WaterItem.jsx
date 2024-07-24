import css from './WaterItem.module.scss';
import icons from '../../img/icons/icons.svg';

const WaterItem = () => {
  return (
    <div className={css.water_item_content}>
      <svg className={css.icon_water_glass} width="38" height="38">
        <use href={`${icons}#water-glass`}></use>
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
            <use href={`${icons}#pencil-square`}></use>
          </svg>
        </button>
        <button
          className={css.deleteBtn}
          // onClick={openModalDelete}
          aria-label="Delete the entered amount of water"
        >
          <svg className={css.icon_action} width="14" height="14">
            <use href={`${icons}#trash`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterItem;
