import { Box, Grid, Typography } from '@mui/material';
import { AddAccount, LoadingSpinner } from '../components';
import AccountsSummaryCard from '../components/AccountsSummaryCard';
import LastTransactionsCard from '../components/LastTransactionsCard';
import MonthlySpendCard from '../components/MonthlySpendCard';
import PageTitle from '../components/PageTitle';
import SpendTrendCard from '../components/SpendTrendCard';
import TopCategorySummaryCard from '../components/TopCategorySpendCard';
import TopExpensesCard from '../components/TopExpensesCard';
import { useGetAccountsQuery } from '../services/api';
import { queryDateFormatter } from '../utils/formatters';

const Dashboard = () => {
  const pageTitle = 'Dashboard';
  const month = queryDateFormatter.format(new Date());
  const { data: accounts, isLoading } = useGetAccountsQuery();

  console.log('Dashboard monthRef');
  console.log(month);

  return (
    <Box>
      <PageTitle title={pageTitle} />
      {isLoading && <LoadingSpinner />}
      {accounts && accounts.length === 0 && (
        <Box>
          <Typography mb={2} variant="h6">
            Ooops! Nothing to show here. To get started add your first account!
          </Typography>
          <AddAccount />
        </Box>
      )}
      {accounts && accounts.length > 0 && (
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <AccountsSummaryCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SpendTrendCard refMonth={month} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LastTransactionsCard refMonth={month} numberOfItems={10} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TopCategorySummaryCard refMonth={month} numberOfItems={5} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MonthlySpendCard refMonth={month} months={12} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TopExpensesCard refMonth={month} numberOfItems={10} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
