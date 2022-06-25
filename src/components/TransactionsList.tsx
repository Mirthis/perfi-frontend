import { Box, CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetTransactionsQuery } from '../services/api';

const TransactionsList = () => {
  const { startDate, endDate } = useAppSelector((state) => state.txFilter);

  const { data: transactions, isLoading } = useGetTransactionsQuery({
    startDate,
    endDate,
  });

  if (!isLoading && transactions) {
    console.log(transactions);
  }

  if (isLoading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  return <Grid container spacing={2} />;
};

export default TransactionsList;
