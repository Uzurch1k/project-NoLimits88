import ThemeToggleButton from '../../ThemeToggleButton/ThemeToggleButton';
import css from './SignSection.module.scss';

const SignSection = ({ children }) => {
  return (
    <div className={css.wrapp}>
      <ThemeToggleButton />
      {children}
    </div>
  );
};

export default SignSection;
