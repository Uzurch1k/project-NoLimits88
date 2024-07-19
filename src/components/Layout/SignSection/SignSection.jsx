import css from './SignSection.module.scss';

const SignSection = ({ children }) => {
  return <div className={css.wrapp}>{children}</div>;
};

export default SignSection;
