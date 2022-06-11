/* eslint-disable @typescript-eslint/indent */
import { Grid, Stack, Typography } from '@mui/material';
import { AccountsGetResponse, AccountGetResponseItem } from '../types/types';
import { formatCurrency, capitalizeFirst } from '../utils/numberFormatter';

const AccountsListItem = ({ account }: { account: AccountGetResponseItem }) => (
  <>
    <Grid item xs={3} md={2}>
      <img
        src={`data:image/png;base64,${account.item.institution.logo}`}
        alt="institution_logo"
        height="50px"
      />
    </Grid>
    <Grid item xs={6} md={6} textAlign="left">
      <Typography variant="subtitle1">{account.name}</Typography>
    </Grid>
    <Grid
      item
      md={2}
      sx={{ display: { xs: 'none', md: 'block' } }}
      textAlign="center"
    >
      <Typography>
        {account.subType ? capitalizeFirst(account.subType) : 'N/A'}
      </Typography>
    </Grid>
    <Grid item xs={3} md={2} textAlign="end">
      <Typography>
        {account.currentBalance && account.isoCurrencyCode
          ? formatCurrency(account.currentBalance, account.isoCurrencyCode)
          : '-'}
      </Typography>
    </Grid>
  </>
);

const AccountsList = ({ accounts }: { accounts: AccountsGetResponse }) => (
  <Stack spacing={2}>
    <Grid container spacing={2}>
      {accounts.map((acc) => (
        <AccountsListItem account={acc} key={acc.id} />
      ))}
    </Grid>
  </Stack>
);

export default AccountsList;
