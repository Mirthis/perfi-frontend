/* eslint-disable react/jsx-props-no-spreading */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoginData } from '../types/types';
import { useAppDispatch } from '../reducers/hooks';
import { loginUser } from '../reducers/authReducer';

const LoginForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  // TODO: handle error and success notifications
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const res = await dispatch(loginUser(data));
    console.log(res);
  };

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
          onSubmit={handleSubmit(onSubmit)}
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
            autoFocus
            {...register('email')}
            error={errors.email !== undefined}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.email?.message}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            {...register('password')}
            autoComplete="current-password"
            error={errors.password !== undefined}
          />
          <Typography variant="inherit" color="textSecondary">
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
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
