import { useEffect, useState } from 'react';
import LinkAccountEdit from './LinkAccountEdit';
import PlaidProvider from './PlaidProvider';
import { useCreateLinkTokenMutation } from '../services/api';

const EditAccount = ({ itemId }: { itemId: number }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  // const linkToken = useAppSelector((state) => state.plaid.linkToken);

  const [createLinkToken, { isLoading }] = useCreateLinkTokenMutation();

  useEffect(() => {
    const init = async () => {
      // setLinkToken from localStorage
      if (window.location.href.includes('?oauth_state_id=')) {
        setLinkToken(localStorage.getItem('link_token'));
        return;
      }
      const data = await createLinkToken(itemId).unwrap();
      setLinkToken(data.link_token);
    };
    init();
  }, []);

  if (isLoading || linkToken === null) return <div>Loading...</div>;
  return (
    <PlaidProvider>
      <LinkAccountEdit linkToken={linkToken} />
    </PlaidProvider>
  );
};

export default EditAccount;
