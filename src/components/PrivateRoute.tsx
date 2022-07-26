import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../reducers/hooks';
import { LoginState } from '../types/types';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({
  children,
  onlyLoggedOut = false,
}: {
  children: React.ReactElement;
  onlyLoggedOut?: boolean;
}) => {
  const loginState = useAppSelector((state) => state.auth.state);
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
