/* eslint-disable react/jsx-props-no-spreading */
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { Container } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { LoginRequest, NavigateFromState } from '../types/types';
import { useLoginMutation } from '../services/api';
import { useAppDispatch } from '../reducers/hooks';
import { setUser } from '../reducers/authReducer';
import { useAlert } from './AlertProvider';

const isNavigateFromState = (state: unknown): state is NavigateFromState =>
  (state as NavigateFromState)?.from !== undefined;

const LoginForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });

  const { state } = useLocation();

  const [login, { isLoading, isError, isSuccess, error, data }] =
    useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setError } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  function isFetchBaseQueryError(
    errorObj: unknown,
  ): errorObj is FetchBaseQueryError {
    return (errorObj as FetchBaseQueryError).status !== undefined;
  }

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
      if (isNavigateFromState(state)) {
        navigate(state.from.pathname);
      } else {
        navigate('/');
      }
    }
    if (isError && error) {
      if (isFetchBaseQueryError(error) && error.status === 401) {
        setError('Invalid username or password', 'Login');
      } else {
        setError(
          'Something went wrong. Please retry later or contact us.',
          'Login',
        );
      }
    }
  }, [isSuccess, isError]);

  // const loggedUser = useAppSelector((state) => state);
  // console.log(loggedUser);

  return (
    <Container component="div" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          width="100%"
          onSubmit={handleSubmit(login)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            defaultValue="aaa@sss.ddd"
            autoFocus
            {...register('email')}
            error={errors.email !== undefined}
          />
          <Typography variant="inherit" color="error">
            {errors.email?.message}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            defaultValue="A!23456z"
            id="password"
            {...register('password')}
            autoComplete="current-password"
            error={errors.password !== undefined}
          />
          <Typography variant="inherit" color="error">
            {errors.password?.message}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                {...register('rememberMe')}
              />
            }
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="/api/reset-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/api/sign-up" variant="body2">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
