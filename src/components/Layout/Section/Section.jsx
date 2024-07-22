import css from './Section.module.scss';

const Section = ({ children }) => {
  return (
    <div className="container">
      <div className={css.section}>{children}</div>
    </div>
  );
};

export default Section;
