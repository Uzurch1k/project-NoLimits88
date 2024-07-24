import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const PrivateRoute = ({ component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isLoggedIn = true;

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
