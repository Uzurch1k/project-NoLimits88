import clsx from 'clsx';
import css from './Background.module.scss';

const Background = () => {
  return (
    <div className={css.background}>
      <div className={clsx(css.light, css.x1)}></div>
      <div className={clsx(css.light, css.x2)}></div>
      <div className={clsx(css.light, css.x3)}></div>
      <div className={clsx(css.light, css.x4)}></div>
      <div className={clsx(css.light, css.x5)}></div>
      <div className={clsx(css.light, css.x6)}></div>
      <div className={clsx(css.light, css.x7)}></div>
      <div className={clsx(css.light, css.x8)}></div>
      <div className={clsx(css.light, css.x9)}></div>
    </div>
  );
};

export default Background;
