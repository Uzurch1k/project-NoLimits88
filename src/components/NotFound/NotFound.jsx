import { TbFaceIdError } from 'react-icons/tb';

import css from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={css.notfound}>
      <TbFaceIdError />
    </div>
  );
};

export default NotFound;
