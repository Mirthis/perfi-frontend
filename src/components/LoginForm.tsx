/* eslint-disable react/jsx-props-no-spreading */
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { Container } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { AuthErrorName, LoginRequest, NavigateFromState } from '../types/types';
import { useLoginMutation } from '../services/api';
import { useAppDispatch } from '../reducers/hooks';
import { setUser } from '../reducers/authReducer';
import { useAlert } from './AlertProvider';
import { isAuthErrror } from '../utils/errors';

// Determine type of the state retrieved from useLocation to allow access
// to from property
const isNavigateFromState = (state: unknown): state is NavigateFromState =>
  (state as NavigateFromState)?.from !== undefined;

const LoginForm = () => {
  const { state } = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setError } = useAlert();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: LoginRequest) => {
    try {
      const loggedUser = await login(data).unwrap();
      console.log('loggedUser');
      console.log(loggedUser);
      dispatch(setUser(loggedUser));
      // if (loggedUser) throw new Error('stop');
      if (isNavigateFromState(state)) {
        // redirect to from Location is this is defined

        navigate(state.from.pathname, { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      if (isAuthErrror(error)) {
        if (error.data.name === AuthErrorName.USER_NOT_VERIFIED) {
          setError('User email needs to be verified before login');
          navigate('/verify-email', {
            replace: true,
            state: { email: data.email },
          });
        } else if (
          error.data.name === AuthErrorName.USER_CREDENTIALS_NOT_FOUND
        ) {
          setError('Invalid username or password', 'Login');
        }
      } else {
        setError('Something went wrong. Please retry later or contact us.');
      }
    }
  };

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
          onSubmit={handleSubmit(submit)}
          noValidate
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            defaultValue="sample@perfiapp.io"
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
            defaultValue="F!zb4n82"
            id="password"
            {...register('password')}
            autoComplete="current-password"
            error={errors.password !== undefined}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              sx={{ flexGrow: 1 }}
              textAlign="left"
              variant="inherit"
              color="error"
            >
              {errors.password?.message}
            </Typography>
            <Link
              textAlign="right"
              to="/reset-password"
              variant="body2"
              component={RouterLink}
            >
              Forgot password?
            </Link>
          </Box>
          {/* TODO: Implement remember me on back-end session */}
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

          <Typography variant="body2">
            Not having an account?{' '}
            <Link to="/signup" variant="body2" component={RouterLink}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
