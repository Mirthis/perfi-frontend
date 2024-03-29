/* eslint-disable react/jsx-props-no-spreading */
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as Yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Alert, AlertTitle, Button } from '@mui/material';
import { SignUpData } from '../types/types';
import { useSignupMutation } from '../services/api';
import { useAlert } from './AlertProvider';
import { isValidationErrror } from '../utils/errors';
import TermAndConditionsModal from './modals/TermAndConditionsModal';
import { DEMO_ONLY } from '../utils/config';

const SignUpForm = () => {
  const [showModal, setShowModal] = useState(false);

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

  const [signup, { isLoading }] = useSignupMutation();

  const navigate = useNavigate();
  const { setError, setSuccess } = useAlert();

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm<SignUpData>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: SignUpData) => {
    try {
      await signup(data).unwrap();
      setSuccess(
        'Sign up sucessfull! A verification email has been sent to your account',
      );
      navigate('/', { replace: true });
    } catch (error) {
      if (
        isValidationErrror(error) &&
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
  };

  return (
    <Container component="div" maxWidth="xs">
      {DEMO_ONLY && (
        <Alert severity="info">
          <AlertTitle>Demo restriction</AlertTitle>
          Signing up for a new accoutn is not supported in the demo.
        </Alert>
      )}
      <TermAndConditionsModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.light' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          width="100%"
          onSubmit={handleSubmit(submit)}
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
                I agree to the{' '}
                <Button
                  sx={{ textTransform: 'none', m: 0 }}
                  variant="text"
                  onClick={() => setShowModal(true)}
                >
                  Terms and Conditions
                </Button>
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
            disabled={DEMO_ONLY}
          >
            Sign Up
          </LoadingButton>

          <Typography variant="body2">
            Already have an account?{' '}
            <Link to="login" component={RouterLink}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
