import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import LinkAccount from './LinkAccount';
import { getLinkToken, setLinkToken } from '../reducers/plaidReducer';
import { PlaidProvider } from './PlaidProvider';

const AddAccount = () => {
  const dispatch = useAppDispatch();
  const linkToken = useAppSelector((state) => state.plaid.linkToken);

  const generateToken = useCallback(async () => {
    await dispatch(getLinkToken());
  }, [dispatch]);

  useEffect(() => {
    const init = async () => {
      // setLinkToken from localStorage
      if (window.location.href.includes('?oauth_state_id=')) {
        dispatch(setLinkToken(localStorage.getItem('link_token')));
        return;
      }
      generateToken();
    };
    init();
  }, [dispatch, generateToken]);

  if (linkToken === null) return <div>Loading...</div>;
  return (
    <PlaidProvider>
      <LinkAccount linkToken={linkToken} />
    </PlaidProvider>
  );
};

export default AddAccount;
