/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useRequestVerifyEmailMutation } from '../services/api';
import { AuthErrorName, RequestVerifyEmailReq } from '../types/types';
import { useAlert } from './AlertProvider';
import { isAuthErrror } from '../utils/errors';

const RequestVerifyEmailForm = ({ email }: { email?: string }) => {
  const navigate = useNavigate();

  const { setError, setSuccess } = useAlert();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });

  const [requestVerifyEmail, { isLoading }] = useRequestVerifyEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestVerifyEmailReq>({
    mode: 'onTouched',
    defaultValues: { email },
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: RequestVerifyEmailReq) => {
    try {
      await requestVerifyEmail(data.email).unwrap();
      setSuccess(`A verification email has been sent tou ${data.email}`);
      navigate('/');
    } catch (err) {
      if (isAuthErrror(err)) {
        switch (err.data.name) {
          case AuthErrorName.USER_EMAIL_NOT_FOUND:
            setError(`No user found with email ${data.email}`);
            break;
          case AuthErrorName.USER_ALREADY_VERIFIED:
            setError(
              `User at ${data.email} already verified. You can now login`,
            );
            navigate('/login', { replace: true });
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
      <Typography variant="h4">Verification email</Typography>
      <Typography>
        You can use the form below to request a verification email for your
        account
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
          Request verification
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default RequestVerifyEmailForm;
