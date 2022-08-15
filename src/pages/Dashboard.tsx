import { Box, Grid, Typography } from '@mui/material';
import { LoadingSpinner } from '../components';
import AccountsSummaryCard from '../components/AccountsSummaryCard';
import LastTransactionsCard from '../components/LastTransactionsCard';
import MonthlySpendCard from '../components/MonthlySpendCard';
import PageTitle from '../components/PageTitle';
import SpendTrendCard from '../components/SpendTrendCard';
import TopCategorySummaryCard from '../components/TopCategorySpendCard';
import TopExpensesCard from '../components/TopExpensesCard';
import { useGetAccountsQuery } from '../services/api';
import {
  DEMO_ONLY,
  LAST_TRANSACTIONS_ITEMS,
  MONTLY_SPEND_MONTHS,
  TOP_CATEGORIES_ITEMS,
  TOP_EXPENSES_ITEMS,
} from '../utils/config';
import { queryDateFormatter } from '../utils/formatters';

const Dashboard = () => {
  const dashboardDate = DEMO_ONLY ? new Date('2022-04-20') : new Date();
  const month = queryDateFormatter.format(dashboardDate);
  const { data: accounts, isLoading } = useGetAccountsQuery();

  return (
    <Box>
      <PageTitle title="Dashboard" />
      {isLoading && <LoadingSpinner />}
      {accounts && accounts.length === 0 && (
        <Box>
          <Typography mb={2} variant="h6">
            Ooops! Nothing to show here. To get started add your first account!
          </Typography>
          {/* <AddAccount /> */}
        </Box>
      )}
      {accounts && accounts.length > 0 && (
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <SpendTrendCard refMonth={month} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MonthlySpendCard refMonth={month} months={MONTLY_SPEND_MONTHS} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TopCategorySummaryCard
              refMonth={month}
              numberOfItems={TOP_CATEGORIES_ITEMS}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <LastTransactionsCard
              refMonth={month}
              numberOfItems={LAST_TRANSACTIONS_ITEMS}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TopExpensesCard
              refMonth={month}
              numberOfItems={TOP_EXPENSES_ITEMS}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AccountsSummaryCard />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
