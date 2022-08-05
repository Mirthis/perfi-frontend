import { useEffect } from 'react';
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from 'react-plaid-link';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useUpdateItemAccessMutation } from '../services/api';

const LinkAccountNew = ({ linkToken }: { linkToken: string }) => {
  const [updateAccess, { isLoading }] = useUpdateItemAccessMutation();

  const onSuccess = async (
    publicToken: string,
    metadata: PlaidLinkOnSuccessMetadata,
  ) => {
    await updateAccess({ publicToken, metadata }).unwrap();
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
        variant="text"
        onClick={() => open()}
        disabled={!ready}
        color="success"
        startIcon={<SystemUpdateAltIcon />}
      >
        Edit Access
      </LoadingButton>
    </Box>
  );
};

export default LinkAccountNew;
