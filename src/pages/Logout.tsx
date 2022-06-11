import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../reducers/authReducer';
import { useAppDispatch } from '../reducers/hooks';

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await dispatch(logoutUser());
      navigate('/', { replace: true });
    };
    logout();
  }, [dispatch]);

  return <Typography>Logging you off...</Typography>;
};

export default Logout;
