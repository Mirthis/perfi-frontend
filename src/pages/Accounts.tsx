import { CircularProgress, Box, Typography, Stack } from '@mui/material';
import AccountsList from '../components/AccountsList';
import AddAccount from '../components/AddAccount';
import { useGetUserAccountsQuery } from '../services/api';

const Accounts = () => {
  const { data: accountsList, error, isLoading } = useGetUserAccountsQuery();

  if (error) {
    console.log(error);
  }

  const accountsNumber =
    accountsList && accountsList.length ? accountsList.length : 0;
  const postLoadTitle = accountsNumber
    ? `${accountsNumber} Accounts`
    : 'No accounts added';

  return (
    <Stack spacing={2}>
      {isLoading ? (
        <Typography variant="h4">Loading account list...</Typography>
      ) : (
        <Stack direction="row" spacing={3}>
          <Typography variant="h4">{postLoadTitle}</Typography>
          <AddAccount />
        </Stack>
      )}
      <>
        {accountsList && <AccountsList accounts={accountsList} />}
        {/* TODO: add placeholder when loading */}
        {isLoading && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
      </>
    </Stack>
  );
};

export default Accounts;
