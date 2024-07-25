import css from './WaterList.module.scss';

import WaterItem from '../WaterItem/WaterItem';

const WaterList = () => {
  return (
    <div className={css.waterListSec}>
      <div className={css.waterListbody}>
        <ul className={css.waterList}>
          <WaterItem />
          <WaterItem />
          <WaterItem />
          <WaterItem />
          <WaterItem />
          <WaterItem />
          <WaterItem />
        </ul>
      </div>
    </div>
  );
};

export default WaterList;
