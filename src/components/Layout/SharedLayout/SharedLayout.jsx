import { Suspense } from 'react';

import Main from '../Main/Main';
import { Loader } from '../../Loader/Loader';

import css from './SharedLayout.module.scss';

const SharedLayout = ({ children }) => {
  return (
    <div>
      <Main>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </Main>
    </div>
  );
};

export default SharedLayout;
