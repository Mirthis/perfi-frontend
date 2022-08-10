import { useEffect } from 'react';
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from 'react-plaid-link';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSetAccessTokenMutation } from '../services/api';
import { isPlaidErrror } from '../utils/errors';
import { PlaidErrorName } from '../types/types';
import { useAlert } from './AlertProvider';
import LoadingSpinner from './LoadingSpinner';

const LinkAccountNew = ({ linkToken }: { linkToken: string }) => {
  const [setAccessToken, { isLoading }] = useSetAccessTokenMutation();
  const { setError } = useAlert();

  const onSuccess = (
    publicToken: string,
    metadata: PlaidLinkOnSuccessMetadata,
  ) => {
    // send public_token to server
    const setToken = async () => {
      try {
        await setAccessToken({ publicToken, metadata }).unwrap();
      } catch (error) {
        if (
          isPlaidErrror(error) &&
          error.data.name === PlaidErrorName.DUPLICATE_INSTITUTION
        ) {
          setError(
            'This financial institution is already connect to your account. You can add or remove accounts from the Accounts page.',
          );
        } else {
          setError('Something went wrong. Please retry later or contact us.');
        }
      }
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
        <>
          <LoadingSpinner />
          <Typography>
            The selected accounts are being added to your account
          </Typography>
        </>
      )}
    </Box>
  );
};

export default LinkAccountNew;
