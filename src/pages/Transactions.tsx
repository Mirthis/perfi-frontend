import { Grid } from '@mui/material';
import { TransactionsStats } from '../components';
import TransactionsFilter from '../components/TransactionsFilter';
import TransactionsList from '../components/TransactionsList';

const Transactions = () => (
  <Grid container columnSpacing={6} rowSpacing={6}>
    <Grid item xs={12} md={8}>
      <TransactionsFilter />
    </Grid>
    <Grid item xs={12} md={8} display={{ xs: 'none', sm: 'flex' }} />
    <Grid item xs={12} md={8}>
      <TransactionsList />
    </Grid>
    <Grid item xs={12} md={4}>
      <TransactionsStats />
    </Grid>
  </Grid>
);

export default Transactions;
