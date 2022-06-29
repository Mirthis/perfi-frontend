import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../reducers/authReducer';
import { useAppDispatch } from '../reducers/hooks';
import { useLogoutMutation } from '../services/api';

const Logout = () => {
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const callLogout = async () => {
      logout();
      dispatch(clearUser());
      navigate('/');
    };
    callLogout();
  }, []);

  return <Typography>Logging you off...</Typography>;
};

export default Logout;
