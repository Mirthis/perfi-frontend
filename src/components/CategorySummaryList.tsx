import { Box, CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetSpendingByCategoryQuery } from '../services/api';
import { GetSpendingByCategoryOptions } from '../types/types';
import CategorySpendingPieChart from './CategorySpendingPieChart';
import CategorySummary from './CategorySummaryCard';

const CategoriesSummaryList = () => {
  const { startDate, endDate, account } = useAppSelector(
    (state) => state.txFilter,
  );

  const queryFilter: GetSpendingByCategoryOptions = {
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
    <>
      <CategorySpendingPieChart />
      <Grid container spacing={2}>
        {summaryData?.map((sd) => (
          <Grid key={sd.id} item xs={12} md={6} lg={4}>
            <CategorySummary summaryData={sd} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CategoriesSummaryList;
