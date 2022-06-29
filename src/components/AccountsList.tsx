/* eslint-disable @typescript-eslint/indent */
import { Grid, Stack } from '@mui/material';
import { AccountsGetResponse } from '../types/types';
import AccountCard from './AccountCard';

const AccountsList = ({ accounts }: { accounts: AccountsGetResponse }) => (
  <Stack spacing={2}>
    <Grid container spacing={2}>
      {accounts.map((acc) => (
        <Grid key={acc.id} item xs={12} md={6} lg={4}>
          <AccountCard account={acc} key={acc.id} />
        </Grid>
      ))}
    </Grid>
  </Stack>
);

export default AccountsList;
