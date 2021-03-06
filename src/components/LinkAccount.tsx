import { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  useGetAccountsWithStatsQuery,
  useSetAccessTokenMutation,
} from '../services/api';
import { queryDateFormatter } from '../utils/formatters';

const LinkAccount = ({ linkToken }: { linkToken: string }) => {
  // const { dispatch: plaidDispatch } = usePlaidState();
  // const dispatch = useAppDispatch();
  const monthKey = queryDateFormatter.format(new Date());

  const { refetch } = useGetAccountsWithStatsQuery(monthKey);
  const [setAccessToken, { isLoading }] = useSetAccessTokenMutation();

  // const onSuccess = React.useCallback((public_token: string) => {
  //   // send public_token to server
  //   const setToken = async () => {
  //     setAccessToken(public_token);
  //     refetch();
  //   };
  //   setToken();
  // }, []);

  const onSuccess = (public_token: string) => {
    // send public_token to server
    const setToken = async () => {
      await setAccessToken(public_token);
      refetch();
    };
    setToken();
  };

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
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <LoadingButton
        loading={isLoading}
        variant="contained"
        onClick={() => open()}
        disabled={!ready}
      >
        Add Account
      </LoadingButton>
      {isLoading && (
        <Typography>
          The selected accounts are being added to your account
        </Typography>
      )}
    </Box>
  );
};

export default LinkAccount;
