import { Grid } from '@mui/material';
import {
  TransactionsStats,
  CategoriesList,
  AccountsList,
  PageTitle,
} from '../components';
import TransactionsFilter from '../components/TransactionsFilter';
import TransactionsList from '../components/TransactionsList';
import { useAppSelector } from '../reducers/hooks';
import { TxFilterMode } from '../types/types';

const Spending = () => {
  const { mode, account, category } = useAppSelector((state) => state.txFilter);
  return (
    <Grid container columnSpacing={6} rowSpacing={2}>
      <Grid item xs={12} lg={8}>
        <TransactionsFilter showMode />
      </Grid>
      <Grid item lg={4} display={{ xs: 'none', lg: 'flex' }} />
      <Grid item xs={12} lg={8}>
        {(account || category) && <TransactionsList />}
        {mode === TxFilterMode.Categories && !category && (
          <>
            <PageTitle title="Spending View" />
            <CategoriesList />
          </>
        )}
        {mode === TxFilterMode.Accounts && !account && (
          <>
            <PageTitle title="Spending View" />
            <AccountsList />
          </>
        )}
      </Grid>
      <Grid item lg={4} display={{ xs: 'none', lg: 'flex' }}>
        <TransactionsStats />
      </Grid>
    </Grid>
  );
};

export default Spending;
