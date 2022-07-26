import { useParams } from 'react-router-dom';
import RequestResetPasswordForm from '../components/RequestResetPasswordForm';
import ResetPasswordForm from '../components/ResetPasswordForm';

const ResetPassword = () => {
  const { token } = useParams();

  return !token ? (
    <RequestResetPasswordForm />
  ) : (
    <ResetPasswordForm token={token} />
  );
};

export default ResetPassword;
