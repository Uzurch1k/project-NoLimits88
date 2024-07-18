import css from './Main.module.scss';

const Main = ({ children }) => {
  return <main className={css.main}>{children}</main>;
};

export default Main;
