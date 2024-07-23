import { Suspense } from 'react';

import Main from '../Main/Main';
import { LoaderMain, LoaderDetails } from '../../Loader/Loader';

const SharedLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <Main>
        {/* <Suspense fallback={<LoaderMain />}>{children}</Suspense> */}
        <LoaderDetails />
      </Main>
    </div>
  );
};

export default SharedLayout;
