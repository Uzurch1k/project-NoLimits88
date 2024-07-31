import { useContext } from 'react';

import { ThemeContext } from '../Providers/ThemeProvider';

import { FaSun, FaMoon } from 'react-icons/fa';

import clsx from 'clsx';
import css from './ThemeTogleButton.module.scss';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={css.toggleBtnBody}>
      <button
        onClick={toggleTheme}
        className={clsx(css.toggleBtn, {
          [css.toggleBtnColor]: theme === 'dark',
        })}
      >
        {theme === 'dark' ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
