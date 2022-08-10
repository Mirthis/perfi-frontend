import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container,
  styled,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { useAppDispatch } from './reducers/hooks';
import { AppBar, Alert } from './components';

import { initializeAuthState } from './reducers/authReducer';
import AppRoutes from './components/AppRoutes';
import Footer from './components/Footer';

const App = () => {
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const dispatch = useAppDispatch();

  const [darkMode, setDarkMode] = useState<boolean>(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      secondary: {
        main: '#1b5e20',
      },
      primary: {
        main: '#26a69a',
      },
    },
  });

  /* Initilize auth state. This determine routes and accss 
  to different pages and components */
  useEffect(() => {
    dispatch(initializeAuthState());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme>
        <Router>
          <AppBar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Offset />
          <Container
            component="main"
            maxWidth="xl"
            sx={{ mt: 6, mb: 10, minWidth: 350, minHeight: '90vh' }}
          >
            {/* Alert status and visibility is managed through the AlertProvider */}
            <Alert />
            <AppRoutes />
          </Container>
          <Footer />
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
