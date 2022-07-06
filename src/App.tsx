import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useEffect } from 'react';
import { Container, styled, Box } from '@mui/material';
import { useAppDispatch } from './reducers/hooks';
import { AppBar, Alert, PrivateRoute } from './components';
// import { Home, Login, Accounts, Logout, SignUp, Transactions } from './pages';
import {
  Home,
  Login,
  Accounts,
  Logout,
  Transactions,
  SignUp,
  Terms,
} from './pages';
import { initializeLoggedUser } from './reducers/authReducer';

const getPrivateRoutes = () => {
  interface PrivateRouteData {
    path: string;
    element: React.ReactElement;
    key?: string;
    onlyLoggedOut?: boolean;
  }

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
      path: '/logout',
      element: <Logout />,
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

const App = () => {
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeLoggedUser());
  }, [dispatch]);

  return (
    <Router>
      <AppBar />
      <Offset />
      <Container component="main" maxWidth="xl">
        <Alert />
        <Box my={2}>
          <Routes>
            {/* {publicRouteList()} */}
            <Route key="home" path="/" element={<Home />} />
            <Route key="terms" path="/" element={<Terms />} />
            {getPrivateRoutes()};
            <Route key="*" path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
