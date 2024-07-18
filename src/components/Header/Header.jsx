import github from '../../image/git-hub.jpg';
import css from './Header.module.scss';

const Header = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.body}>
          <h1 className={css.title}>__start-vite-react</h1>
          <a
            className={css.link}
            href="https://github.com/Uzurch1k"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
