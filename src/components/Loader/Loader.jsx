import { ThreeDots } from 'react-loader-spinner';

import css from './Loader.module.scss';
import clsx from 'clsx';

export const LoaderMain = () => {
  return (
    <div className={css.main}>
      <div className={css.box}>
        <p className={css.title}>AquaTrack</p>
      </div>
    </div>
  );
};

export const LoaderDetails = isPositioning => {
  return (
    <ThreeDots
      visible={true}
      height="50"
      width="50"
      color={isPositioning ? 'white' : '#87d28d'}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ color: 'yellow' }}
      wrapperClass={clsx({
        [css.details]: true,
        [css.loaderPositioning]: isPositioning,
      })}
    />
  );
};
