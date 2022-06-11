import React, { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
// import Button from 'plaid-threads/Button';
import { Button } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import { usePlaidState } from '../state';
import plaidService from '../services/plaid';

const LinkAccount = ({ linkToken }: { linkToken: string }) => {
  const { dispatch: plaidDispatch } = usePlaidState();
  // const dispatch = useAppDispatch();

  const onSuccess = React.useCallback(
    (public_token: string) => {
      // send public_token to server
      const setToken = async () => {
        console.log(public_token);
        const data = await plaidService.getAccessToken(public_token);

        console.log(data);
        plaidDispatch({
          type: 'SET_STATE',
          state: {
            itemId: data.item_id,
            accessToken: data.access_token,
            isItemAccess: true,
          },
        });
      };
      setToken();
      plaidDispatch({ type: 'SET_STATE', state: { linkSuccess: true } });
      window.history.pushState('', '', '/');
    },
    [plaidDispatch],
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  let isOauth = false;

  if (window.location.href.includes('?oauth_state_id=')) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <Button variant="contained" onClick={() => open()} disabled={!ready}>
      Add Account
    </Button>
  );
};

export default LinkAccount;
