import { Grid } from '@mui/material';
import {
  TransactionsStats,
  CategorySummaryBarChart,
  CategorySummaryList,
} from '../components';
import TransactionsFilter from '../components/TransactionsFilter';
import TransactionsList from '../components/TransactionsList';
import { useAppSelector } from '../reducers/hooks';
import { TxFilterMode } from '../types/types';

const Transactions = () => {
  const { mode, category } = useAppSelector((state) => state.txFilter);
  return (
    <>
      <TransactionsFilter />
      {mode === TxFilterMode.Summary && <CategorySummaryList />}
      {mode === TxFilterMode.List && category && (
        <CategorySummaryBarChart categoryId={category} />
      )}
      {mode === TxFilterMode.List && (
        <Grid container columnSpacing={4}>
          <Grid item xs={12} md={8}>
            <TransactionsList />
          </Grid>
          <Grid item md={4} display={{ xs: 'none', sm: 'flex' }}>
            <TransactionsStats />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Transactions;
