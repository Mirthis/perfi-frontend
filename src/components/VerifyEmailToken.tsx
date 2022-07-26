import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerifyEmailMutation } from '../services/api';
import { AuthErrorName } from '../types/types';
import { isAuthErrror } from '../utils/errors';
import { useAlert } from './AlertProvider';
import LoadingSpinner from './LoadingSpinner';

const VerifyEmailToken = ({ token }: { token: string }) => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const navigate = useNavigate();
  const { setError, setSuccess } = useAlert();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token).unwrap();
        setSuccess('Your account has been verified. You can now login');
        navigate('/login', { replace: true });
      } catch (err) {
        if (isAuthErrror(err)) {
          switch (err.data.name) {
            case AuthErrorName.VERIFY_EMAIL_TOKEN_EXPIRED:
              setError(
                `Email verification token expired. Please request a new one`,
              );
              navigate('/verify_email', { replace: true });
              break;
            case AuthErrorName.VERIFY_EMAIL_TOKEN_NOT_FOUND:
              setError(
                `Email verification token not found. Please request a new one`,
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
    if (token) {
      verify();
    }
  }, []);

  return (
    <Container component="div" maxWidth="xs">
      <Typography variant="h4">Verifying your email...</Typography>
      {isLoading && <LoadingSpinner />}
    </Container>
  );
};

export default VerifyEmailToken;
