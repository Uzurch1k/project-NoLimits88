import Languages from '../../Languages/Languages';
import ThemeToggleButton from '../../ThemeToggleButton/ThemeToggleButton';

import css from './SignSection.module.scss';

const SignSection = ({ children }) => {
  return (
    <div className={css.wrapp}>
      <ThemeToggleButton />
      <Languages />
      {children}
    </div>
  );
};

export default SignSection;
