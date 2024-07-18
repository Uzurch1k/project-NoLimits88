import { Suspense } from 'react';

import Main from '../Main/Main';
import { Loader } from '../../Loader/Loader';

const SharedLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <Main>
        <Suspense fallback="Loader">{children}</Suspense>
      </Main>
    </div>
  );
};

export default SharedLayout;
