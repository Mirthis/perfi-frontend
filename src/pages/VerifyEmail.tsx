import { useParams } from 'react-router-dom';
import RequestVerifyEmailForm from '../components/RequestVerifyEmailForm';
import VerifyEmailToken from '../components/VerifyEmailToken';

const VerifyEmail = () => {
  const { token } = useParams();

  return !token ? (
    <RequestVerifyEmailForm />
  ) : (
    <VerifyEmailToken token={token} />
  );
};

export default VerifyEmail;
