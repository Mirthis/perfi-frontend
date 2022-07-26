import { Box, Grid } from '@mui/material';
import AccountsSummaryCard from '../components/AccountsSummaryCard';
import PageTitle from '../components/PageTitle';
import SpendTrendCard from '../components/SpendTrendCard';

const Dashboard = () => {
  const pageTitle = 'Dashboard';

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
      </Grid>
    </Box>
  );
};

export default Dashboard;
