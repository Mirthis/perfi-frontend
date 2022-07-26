/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../services/api';
import { AuthErrorName, ResetPasswordFields } from '../types/types';
import { useAlert } from './AlertProvider';
import { isAuthErrror } from '../utils/errors';

// TODO: Add check that the token isvalid before showing the form
const ResetPasswordForm = ({ token }: { token: string }) => {
  const navigate = useNavigate();

  const { setError, setSuccess } = useAlert();
  const validationSchema = Yup.object().shape({
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
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFields>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: ResetPasswordFields) => {
    try {
      await resetPassword({ token, password: data.password }).unwrap();
      setSuccess(
        `Your password has been successfully reset. You can now login.`,
      );
      navigate('/login', { replace: true });
    } catch (err) {
      if (isAuthErrror(err)) {
        switch (err.data.name) {
          case AuthErrorName.VERIFY_PASSWORD_TOKEN_EXPIRED:
            setError(
              `Reset password token is expired. Please request again to reset your password.`,
            );
            navigate('/reset_password', { replace: true });
            break;
          case AuthErrorName.VERIFY_PASSWORD_TOKEN_NOT_FOUND:
            setError(
              `Reset password token not found. Please request to reset your password.`,
            );
            navigate('/reset_password', { replace: true });
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
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
        >
          Reset Password
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default ResetPasswordForm;
