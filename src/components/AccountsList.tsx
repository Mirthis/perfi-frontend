/* eslint-disable @typescript-eslint/indent */
import { Grid } from '@mui/material';
import { AccountListWithStats } from '../types/types';
import AccountCard from './AccountCard';

const AccountsList = ({ accounts }: { accounts: AccountListWithStats }) => (
  <Grid container spacing={2}>
    {accounts.map((acc) => (
      <Grid key={acc.id} item xs={12} md={6} lg={4}>
        <AccountCard account={acc} key={acc.id} />
      </Grid>
    ))}
  </Grid>
);

export default AccountsList;
