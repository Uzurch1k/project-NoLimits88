import css from './Background.module.scss';

const Background = () => {
  return (
    <div className={css.lines}>
      <div className={css.line}></div>
      <div className={css.line}></div>
      <div className={css.line}></div>
    </div>
  );
};

export default Background;
