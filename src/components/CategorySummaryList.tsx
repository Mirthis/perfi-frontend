import { Box, CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetSpendingByCategoryQuery } from '../services/api';
import { GetSpendingByOptionsBase } from '../types/types';
import CategorySummaryCard from './CategorySummaryCard';

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

  if (!summaryIsLoading && summaryData) {
    console.log('Summary data:');
    console.log(summaryData);
  }

  if (summaryIsLoading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Grid container spacing={2}>
      {summaryData?.map((sd) => (
        <Grid key={sd.id} item xs={12} md={6} lg={4}>
          <CategorySummaryCard summaryData={sd} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategorYSummaryList;
