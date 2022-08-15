import { ManageAccounts } from '@mui/icons-material';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Home,
  Terms,
  Transaction,
  ManageCategories,
  Login,
  Logout,
  Transactions,
  SignUp,
  VerifyEmail,
  Dashboard,
  ResetPassword,
  Spending,
  Accounts,
  Demo,
  About,
} from '../pages';
import { useAppSelector } from '../reducers/hooks';
import { LoginState, PrivateRouteData } from '../types/types';
import PrivateRoute from './PrivateRoute';

const privateRoutes: Array<PrivateRouteData> = [
  {
    path: '/spending',
    element: <Spending />,
  },
  {
    path: '/transactions',
    element: <Transactions />,
  },
  {
    path: '/accounts',
    element: <Accounts />,
  },
  {
    path: '/transaction/:id',
    element: <Transaction />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/manage/categories',
    element: <ManageCategories />,
  },
  {
    path: '/manage/accounts',
    element: <ManageAccounts />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login />,
    onlyLoggedOut: true,
  },
  {
    path: '/signup',
    element: <SignUp />,
    onlyLoggedOut: true,
  },
  {
    path: '/reset-password/',
    element: <ResetPassword />,
    onlyLoggedOut: true,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
    onlyLoggedOut: true,
  },
  {
    path: '/verify-email/',
    element: <VerifyEmail />,
    onlyLoggedOut: true,
  },
  {
    path: '/verify-email/:token',
    element: <VerifyEmail />,
    onlyLoggedOut: true,
  },
];

const getPrivateRoutes = (loginState: LoginState) => {
  const routesEl = privateRoutes.map((pr) => (
    <Route
      key={pr.key || pr.path}
      path={pr.path}
      element={
        <PrivateRoute loginState={loginState} onlyLoggedOut={pr.onlyLoggedOut}>
          {pr.element}
        </PrivateRoute>
      }
    />
  ));

  return routesEl;
};

const AppRoutes = () => {
  const loginState = useAppSelector((state) => state.auth.state);

  const homeElement =
    loginState === LoginState.PENDING || loginState === LoginState.LOGGEDOUT ? (
      <Home />
    ) : (
      <Dashboard />
    );

  return (
    <Routes>
      {/* {publicRouteList()} */}
      <Route key="home" path="/" element={homeElement} />
      <Route key="terms" path="/terms" element={<Terms />} />
      <Route key="about" path="/about" element={<About />} />
      <Route key="demo" path="/demo" element={<Demo />} />
      {getPrivateRoutes(loginState)};
      <Route key="*" path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
