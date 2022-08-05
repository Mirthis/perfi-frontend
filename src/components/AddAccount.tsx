import { useEffect } from 'react';
import LinkAccountNew from './LinkAccountNew';
import { setLinkToken } from '../reducers/plaidReducer';
import PlaidProvider from './PlaidProvider';
import { useCreateLinkTokenMutation } from '../services/api';
import { useAppSelector, useAppDispatch } from '../reducers/hooks';

const AddAccount = () => {
  const linkToken = useAppSelector((state) => state.plaid.linkToken);
  const dispatch = useAppDispatch();

  const [createLinkToken, { isLoading }] = useCreateLinkTokenMutation();

  useEffect(() => {
    const init = async () => {
      // setLinkToken from localStorage
      if (window.location.href.includes('?oauth_state_id=')) {
        dispatch(setLinkToken(localStorage.getItem('link_token')));
        return;
      }
      const data = await createLinkToken().unwrap();
      dispatch(setLinkToken(data.link_token));
    };
    init();
  }, [dispatch]);

  if (isLoading || linkToken === null) return <div>Loading...</div>;
  return (
    <PlaidProvider>
      <LinkAccountNew linkToken={linkToken} />
    </PlaidProvider>
  );
};

export default AddAccount;
