import css from './AdvantagesSection.module.scss';
import ava1 from '../../img/content/ava1.png';
import ava2 from '../../img/content/ava2.png';
import ava3 from '../../img/content/ava3.png';

const AdvantagesSection = () => {
  return (
    <div className={css.advantagesSection}>
      <div className={css.customers}>
        <ul className={css.customersBox}>
          <li className={css.customerImgBox}>
            <img
              className={css.customerImg}
              src={ava1}
              alt="user image"
              width="26.4"
              height="28"
            />
          </li>
          <li className={css.customerImgBox}>
            <img className={css.customerImg} src={ava2} alt="user image" />
          </li>
          <li className={css.customerImgBox}>
            <img className={css.customerImg} src={ava3} alt="user image" />
          </li>
        </ul>
        <div className={css.text}>
          <span>Our</span> <span className={css.highlightedtext}>happy</span>{' '}
          <span>customers</span>
        </div>
      </div>
      <div className={css.group}>
        <ul className={css.advantagesGroup}>
          <li className={css.advantagesGroupItem}>
            <div className={css.ellipse}></div>
            <p>Habit drive</p>
          </li>
          <li className={css.advantagesGroupItem}>
            <p>View statistics</p>
          </li>
          <li className={css.advantagesGroupItem}>
            <p>Personal rate setting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;
