import { ThreeDots } from 'react-loader-spinner';

import css from './Loader.module.scss';

export const LoaderMain = () => {
  return (
    <div className={css.main}>
      <div className={css.box}>
        <p className={css.title}>AquaTrack</p>
      </div>
    </div>
  );
};

export const LoaderDetails = () => {
  return (
    <ThreeDots
      visible={true}
      height="50"
      width="50"
      color="#87d28d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass={css.details}
    />
  );
};
