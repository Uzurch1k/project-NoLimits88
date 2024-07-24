import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RestrictedRoute = ({ component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isLoggedIn = false;

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;
