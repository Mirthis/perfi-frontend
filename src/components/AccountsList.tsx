/* eslint-disable @typescript-eslint/indent */
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetSpendingByAccountQuery } from '../services/api';
import { GetSpendingByOptionsBase } from '../types/types';
import AccountCard from './AccountCard';
import LoadingSpinner from './LoadingSpinner';

const AccountsList = () => {
  const { startDate, endDate } = useAppSelector((state) => state.txFilter);

  const queryFilter: GetSpendingByOptionsBase = {
    startDate,
    endDate,
    removeZeroCounts: true,
  };

  const { data: accounts, isLoading } =
    useGetSpendingByAccountQuery(queryFilter);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {accounts && accounts.length === 0 && (
        <Typography>No transactions.</Typography>
      )}
      <Grid container spacing={2}>
        {accounts?.map((acc) => (
          <Grid key={acc.id} item xs={12} sm={6} xl={4}>
            <AccountCard account={acc} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AccountsList;
