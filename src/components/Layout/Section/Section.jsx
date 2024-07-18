import css from './Section.module.scss';

const Section = ({ children }) => {
  return (
    <div className={css.section}>
      <div className={css.container}>{children}</div>
    </div>
  );
};

export default Section;
