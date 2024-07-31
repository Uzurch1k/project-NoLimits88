import { useContext } from 'react';
import { ThemeContext } from '../Providers/ThemeProvider'; // Оновіть шлях
import { FaSun, FaMoon } from 'react-icons/fa'; // Іконки з React Icons
import css from './ThemeTogleButton.module.scss'
const ThemeToggleButton = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <button onClick={toggleTheme}  className={css.toggleButton} >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default ThemeToggleButton;
