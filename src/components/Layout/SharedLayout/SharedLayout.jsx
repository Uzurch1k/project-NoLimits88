import { Suspense } from 'react';

import { ThemeProvider } from '../../Providers/ThemeProvider';

import Main from '../Main/Main';
import { LoaderMain } from '../../Loader/Loader';

const SharedLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <ThemeProvider>
        <Main>
          <Suspense fallback={<LoaderMain />}>{children}</Suspense>
        </Main>
      </ThemeProvider>
    </div>
  );
};

export default SharedLayout;
