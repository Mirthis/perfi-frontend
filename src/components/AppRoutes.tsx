import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Home,
  Terms,
  Transaction,
  ManageCategories,
  Login,
  Accounts,
  Logout,
  Transactions,
  SignUp,
  VerifyEmail,
  Dashboard,
  ResetPassword,
} from '../pages';
import { PrivateRouteData } from '../types/types';
import PrivateRoute from './PrivateRoute';

const getPrivateRoutes = () => {
  const privateRoutes: Array<PrivateRouteData> = [
    {
      path: '/accounts',
      element: <Accounts />,
    },
    {
      path: '/transactions',
      element: <Transactions />,
    },
    {
      path: '/transaction/:id',
      element: <Transaction />,
    },
    {
      path: '/manage/categories',
      element: <ManageCategories />,
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
      path: '/reset_password/',
      element: <ResetPassword />,
      onlyLoggedOut: true,
    },
    {
      path: '/reset_password/:token',
      element: <ResetPassword />,
      onlyLoggedOut: true,
    },
    {
      path: '/verify_email/',
      element: <VerifyEmail />,
      onlyLoggedOut: true,
    },
    {
      path: '/verify_email/:token',
      element: <VerifyEmail />,
      onlyLoggedOut: true,
    },
  ];

  const routesEl = privateRoutes.map((pr) => (
    <Route
      key={pr.key || pr.path}
      path={pr.path}
      element={
        <PrivateRoute onlyLoggedOut={pr.onlyLoggedOut}>
          {pr.element}
        </PrivateRoute>
      }
    />
  ));

  return routesEl;
};

const AppRoutes = () => (
  <Routes>
    {/* {publicRouteList()} */}
    <Route key="home" path="/" element={<Home />} />
    <Route key="terms" path="/" element={<Terms />} />
    {getPrivateRoutes()};
    <Route key="*" path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
