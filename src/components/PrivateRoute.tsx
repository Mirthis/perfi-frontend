import { Navigate, useLocation } from 'react-router-dom';
import { LoginState } from '../types/types';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({
  children,
  loginState,
  onlyLoggedOut = false,
}: {
  children: React.ReactElement;
  loginState: LoginState;
  onlyLoggedOut?: boolean;
}) => {
  const location = useLocation();

  switch (loginState) {
    case LoginState.PENDING:
      return <LoadingSpinner text="Loading..." />;
    case LoginState.LOGGEDIN:
      if (onlyLoggedOut) {
        return <Navigate to="/" replace />;
      }
      return children;
    case LoginState.LOGGEDOUT:
      if (onlyLoggedOut) {
        return children;
      }
      return <Navigate to="/login" replace state={{ from: location }} />;
    default:
      return null;
  }
};

export default PrivateRoute;
