import { useLocation, useParams } from 'react-router-dom';
import RequestVerifyEmailForm from '../components/RequestVerifyEmailForm';
import VerifyEmailToken from '../components/VerifyEmailToken';
import { NavigateEmailState } from '../types/types';

const VerifyEmail = () => {
  const { token } = useParams();
  const { state } = useLocation();

  const isNavigateEmailState = (obj: unknown): obj is NavigateEmailState =>
    (obj as NavigateEmailState)?.email !== undefined;

  const email = isNavigateEmailState(state) ? state.email : undefined;

  return !token ? (
    <RequestVerifyEmailForm email={email} />
  ) : (
    <VerifyEmailToken token={token} />
  );
};

export default VerifyEmail;
