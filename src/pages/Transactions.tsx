import { Grid } from '@mui/material';
import { TransactionsStats, CategorySummaryList } from '../components';
import TransactionsFilter from '../components/TransactionsFilter';
import TransactionsList from '../components/TransactionsList';
import { useAppSelector } from '../reducers/hooks';
import { TxFilterMode } from '../types/types';

const Transactions = () => {
  const { mode } = useAppSelector((state) => state.txFilter);
  return (
    <>
      <TransactionsFilter />
      <Grid container columnSpacing={6}>
        <Grid item xs={12} md={8}>
          {mode === TxFilterMode.Summary ? (
            <CategorySummaryList />
          ) : (
            <TransactionsList />
          )}
        </Grid>
        <Grid item md={4} display={{ xs: 'none', sm: 'flex' }}>
          <TransactionsStats />
        </Grid>
      </Grid>
    </>
  );
};

export default Transactions;
