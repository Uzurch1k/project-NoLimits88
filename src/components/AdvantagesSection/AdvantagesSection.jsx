import css from './AdvantagesSection.module.scss';

const AdvantagesSection = () => {
  return (
    // <div className={css.bloc}>
    //   <h2>AdvantagesSection</h2>
    // </div>

    <div className={css.advantagesSection}>
      <div className={css.customers}>
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
