import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, styled, Box } from '@mui/material';
import { useAppDispatch } from './reducers/hooks';
import AppBar from './components/AppBar';
import { Home, Login, Accounts, Logout, SignUp, Transactions } from './pages';
import { initializeLoggedUser } from './reducers/authReducer';

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
        <Box my={2}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/accounts" element={<Accounts />} />
          </Routes>
          <Routes>
            <Route path="/transactions/:accountId" element={<Transactions />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
