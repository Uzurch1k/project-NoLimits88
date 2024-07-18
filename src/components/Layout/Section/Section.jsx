import css from './Section.module.scss';

const Section = ({ children }) => {
  return (
    <div className="container">
      <div className={css.section}>
        <div className={css.body}>{children}</div>
      </div>
    </div>
  );
};

export default Section;
