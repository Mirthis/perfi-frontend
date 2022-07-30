import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, styled } from '@mui/material';
import { useAppDispatch } from './reducers/hooks';
import { AppBar, Alert } from './components';

import { initializeAuthState } from './reducers/authReducer';
import AppRoutes from './components/AppRoutes';

const App = () => {
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const dispatch = useAppDispatch();

  /* Initilize auth state. This determine routes and accss 
  to different pages and components */
  useEffect(() => {
    dispatch(initializeAuthState());
  }, [dispatch]);

  return (
    <Router>
      <AppBar />
      <Offset />
      <Container component="main" maxWidth="xl">
        {/* Alert status and visibility is managed through the AlertProvider */}
        <Alert />
        <AppRoutes />
      </Container>
    </Router>
  );
};

export default App;
