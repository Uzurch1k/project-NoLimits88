import Background from '../../Background/Background';
import css from './Wrapper.module.scss';

const Wrapper = ({ children }) => {
  return (
    <>
      <div className={css.wrapper}>{children}</div>
      <Background />
    </>
  );
};

export default Wrapper;
