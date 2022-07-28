import { Box, Grid } from '@mui/material';
import AccountsSummaryCard from '../components/AccountsSummaryCard';
import LastTransactionsCard from '../components/LastTransactionsCard';
import PageTitle from '../components/PageTitle';
import SpendTrendCard from '../components/SpendTrendCard';
import TopCategorySummaryCard from '../components/TopCategorySpendCard';
import TopExpensesCard from '../components/TopExpensesCard';
import { queryDateFormatter } from '../utils/formatters';

const Dashboard = () => {
  const pageTitle = 'Dashboard';
  const month = queryDateFormatter.format(new Date());

  return (
    <Box>
      <PageTitle title={pageTitle} />
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <AccountsSummaryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SpendTrendCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LastTransactionsCard numberOfItems={10} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TopCategorySummaryCard numberOfItems={5} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TopExpensesCard month={month} numberOfItems={10} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
