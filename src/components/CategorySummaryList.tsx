import { Box, CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetTransactionsCategorySummaryQuery } from '../services/api';
import CategorySummary from './CategorySummary';

const CategoriesSummaryList = () => {
  const { startDate, endDate } = useAppSelector((state) => state.txFilter);

  const { data: summaryData, isLoading: summaryIsLoading } =
    useGetTransactionsCategorySummaryQuery({ startDate, endDate });

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
