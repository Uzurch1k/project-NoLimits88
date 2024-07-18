import ScrollUp from '../../ScrollUp/ScrollUp';

import css from './Main.module.scss';

const Main = ({ children }) => {
  return (
    <main className={css.main}>
      {children}
      <ScrollUp />
    </main>
  );
};

export default Main;
