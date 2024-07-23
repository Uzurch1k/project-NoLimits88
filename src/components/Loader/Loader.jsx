import { DNA } from 'react-loader-spinner';

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

// export const LoaderMain = () => {
//   return (
//     <div className={css.main}>
//       <DNA
//         visible={true}
//         height="150"
//         width="150"
//         ariaLabel="dna-loading"
//         wrapperStyle={{}}
//         wrapperClass="dna-wrapper"
//       />
//     </div>
//   );
// };

// export const LoaderDetails = () => {
//   return (
//     <div className={css.details}>
//       <MutatingDots
//         visible={true}
//         height="100"
//         width="100"
//         color="#5f828d"
//         secondaryColor="#5f828d"
//         radius="12.5"
//         ariaLabel="mutating-dots-loading"
//         wrapperStyle={{}}
//         wrapperClass=""
//       />
//     </div>
//   );
// };
