import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../reducers/hooks';

const PrivateRoute = ({
  children,
  onlyLoggedOut = false,
}: {
  children: React.ReactElement;
  onlyLoggedOut?: boolean;
}) => {
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const location = useLocation();

  if (loggedUser) {
    if (onlyLoggedOut) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
  if (onlyLoggedOut) {
    return children;
  }
  return <Navigate to="/login" replace state={{ from: location }} />;

  // return loggedUser ? (
  //   children
  // ) : (
  //   <Navigate to="/login" replace state={{ from: location }} />
  // );
};

export default PrivateRoute;
