/* eslint-disable react/jsx-props-no-spreading */
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SignUpData } from '../types/types';
import { useSignupMutation } from '../services/api';
import { useAlert } from './AlertProvider';

const SignUpForm = () => {
  interface ValidationErrrorData {
    type: string;
    name: string;
    errors: Array<{
      type: string;
      message: string;
      path: string;
    }>;
  }

  function isFetchBaseQueryError(
    errorObj: unknown,
  ): errorObj is FetchBaseQueryError {
    return (errorObj as FetchBaseQueryError).data !== undefined;
  }

  function isValidationErrrorData(data: unknown): data is ValidationErrrorData {
    return (data as ValidationErrrorData)?.type === 'ValidationError';
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain at least one uppercase leetter, one Lowercase letter, one number and one Special character',
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  });

  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  const navigate = useNavigate();
  const { setError } = useAlert();

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm<SignUpData>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  // TODO: handle error and success notifications, including duplicate email check
  // const onSubmit: SubmitHandler<SignUpData> = async (data) => {
  //   signup(data);
  // };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      return;
    }
    if (isError && error) {
      if (
        isFetchBaseQueryError(error) &&
        isValidationErrrorData(error.data) &&
        error.data.name === 'SequelizeUniqueConstraintError'
      ) {
        setFormError('email', {
          type: 'custom',
          message: 'An user with the specified email already exist',
        });
        // setError('.');
      } else {
        setError('Seomething went wrong!');
      }
    }
  }, [isSuccess, isError, error]);

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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          width="100%"
          onSubmit={handleSubmit(signup)}
          sx={{ mt: 3 }}
        >
          <TextField
            required
            fullWidth
            margin="normal"
            id="email"
            label="Email Address"
            autoComplete="email"
            {...register('email')}
            error={errors.email !== undefined}
          />
          <Typography variant="inherit" color="error">
            {errors.email?.message}
          </Typography>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            id="password"
            {...register('password')}
            error={errors.password !== undefined}
          />
          <Typography variant="inherit" color="error">
            {errors.password?.message}
          </Typography>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            error={errors.confirmPassword !== undefined}
          />
          <Typography variant="inherit" color="error">
            {errors.confirmPassword?.message}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="acceptTerms"
                defaultValue="false"
                color="primary"
                {...register('acceptTerms')}
              />
            }
            label={
              <Typography>
                I agree to the
                <a href="/terms">terms and conditions</a>
              </Typography>
            }
          />
          <Typography variant="inherit" color="error">
            {errors.acceptTerms?.message}
          </Typography>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="signup" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
