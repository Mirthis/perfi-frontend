import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetSpendingByCategoryQuery } from '../services/api';
import { GetSpendingByOptionsBase } from '../types/types';
import CategorySummaryCard from './CategorySummaryCard';
import PageTitle from './PageTitle';

const CategorYSummaryList = () => {
  const { startDate, endDate, account } = useAppSelector(
    (state) => state.txFilter,
  );

  const queryFilter: GetSpendingByOptionsBase = {
    startDate,
    endDate,
    removeZeroCounts: true,
  };

  if (account) {
    queryFilter.accountIds = [account];
  }

  const { data: summaryData, isLoading: summaryIsLoading } =
    useGetSpendingByCategoryQuery(queryFilter);

  return (
    <>
      <PageTitle title="Spending View" />
      {summaryIsLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {summaryData && summaryData.length === 0 && (
        <Typography>No data</Typography>
      )}
      <Grid container spacing={2}>
        {summaryData?.map((sd) => (
          <Grid key={sd.id} item xs={12} md={6} lg={4}>
            <CategorySummaryCard summaryData={sd} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CategorYSummaryList;
