/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useRequestResetPasswordMutation } from '../services/api';
import { AuthErrorName, RequestResetPasswordReq } from '../types/types';
import { useAlert } from './AlertProvider';
import { isAuthErrror } from '../utils/errors';

const RequestResetPasswordForm = () => {
  const navigate = useNavigate();

  const { setError, setSuccess } = useAlert();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });

  const [requestResetPassword, { isLoading }] =
    useRequestResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestResetPasswordReq>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: RequestResetPasswordReq) => {
    try {
      console.log('Submitting.');
      await requestResetPassword(data.email).unwrap();
      setSuccess(`A reset password email has been sent tou ${data.email}`);
      navigate('/');
    } catch (err) {
      if (isAuthErrror(err)) {
        switch (err.data.name) {
          case AuthErrorName.USER_EMAIL_NOT_FOUND:
            setError(`No user found with email ${data.email}`);
            break;
          case AuthErrorName.USER_NOT_VERIFIED:
            setError(
              `User at ${data.email} is not verified. Verify your account first.`,
            );
            navigate('/verify_email', { replace: true });
            break;
          default:
            setError(
              `Something went wrong. Please retry later. If you keep  facing this issue please contact us`,
            );
        }
      } else {
        setError(
          `Something went wrong. Please retry later. If you keep  facing this issue please contact us`,
        );
      }
    }
  };

  return (
    <Container component="div" maxWidth="xs">
      <Typography variant="h4">Password Reset</Typography>
      <Typography>
        You can use the form below to request a new password for your account
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
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
        >
          Request Password Reset
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default RequestResetPasswordForm;
