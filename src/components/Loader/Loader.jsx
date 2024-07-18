import { MutatingDots } from 'react-loader-spinner';

import css from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={css.main}>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#5f828d"
        secondaryColor="#5f828d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export const LoaderDetails = () => {
  return (
    <div className={css.details}>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#5f828d"
        secondaryColor="#5f828d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
