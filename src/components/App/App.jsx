import { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';

import SharedLayout from '../Layout/SharedLayout/SharedLayout';
import PrivateRoute from '../Routes/PrivateRoute';
import RestrictedRoute from '../Routes/RestrictedRoute';
import { LoaderMain } from '../Loader/Loader';

import { ThemeProvider } from '../Providers/ThemeProvider';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const TrackerPage = lazy(() => import('../../pages/TrackerPage/TrackerPage'));
const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('../../pages/SignUpPage/SignUpPage'));

import './App.scss';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <LoaderMain />
  ) : (
    <ThemeProvider>
       <ThemeToggleButton />
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <RestrictedRoute redirectTo="/tracker" component={<SignUpPage />} />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/tracker" component={<SignInPage />} />
          }
        />
        <Route
          path="/tracker"
          element={
            <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
          }
        />
      </Routes>
    </SharedLayout>
    </ThemeProvider>
  );
}
export default App;
