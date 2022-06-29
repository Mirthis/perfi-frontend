import { Box, CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetTransactionsCategorySummaryQuery } from '../services/api';
import { GetCategoriesSummaryOptions } from '../types/types';
import CategorySummary from './CategorySummaryCard';

const CategoriesSummaryList = () => {
  const { startDate, endDate, account } = useAppSelector(
    (state) => state.txFilter,
  );

  const queryFilter: GetCategoriesSummaryOptions = {
    startDate,
    endDate,
  };

  if (account) {
    queryFilter.accountIds = [account];
  }

  const { data: summaryData, isLoading: summaryIsLoading } =
    useGetTransactionsCategorySummaryQuery(queryFilter);

  if (!summaryIsLoading && summaryData) {
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
          <CategorySummary summaryData={sd} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesSummaryList;
