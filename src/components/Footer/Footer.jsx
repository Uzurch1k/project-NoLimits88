import github from '../../image/git-hub.jpg';
import css from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.body}>
          <a
            className={css.github}
            href="https://github.com/Uzurch1k"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github" />
          </a>
          <p className={css.text}>2024 All rights reserved</p>
          <a
            className={css.source}
            href="https://github.com/Uzurch1k/contacts-book"
            target="_blank"
            rel="noopener noreferrer"
          >
            source files...
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
