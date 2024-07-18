import { TbError404 } from 'react-icons/tb';

import css from './Error.module.scss';

export const Error = () => {
  return (
    <div className={css.error}>
      <TbError404 />
    </div>
  );
};
