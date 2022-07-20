import { CircularProgress, Box, Typography, Stack } from '@mui/material';
import AccountsList from '../components/AccountsList';
import AddAccount from '../components/AddAccount';
import { useGetAccountsWithStatsQuery } from '../services/api';
import { queryDateFormatter } from '../utils/formatters';

const Accounts = () => {
  const monthKey = queryDateFormatter.format(new Date());
  const { data: accountsList, isLoading } =
    useGetAccountsWithStatsQuery(monthKey);

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
