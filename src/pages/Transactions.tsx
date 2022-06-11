import { useParams } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useGetTransactionsByAccountQuery } from '../services/api';

const Transactions = () => {
  const { accountId } = useParams();

  console.log(accountId);

  const {
    data: transactionsList,
    error,
    isLoading,
  } = useGetTransactionsByAccountQuery(Number(accountId));

  if (error) {
    console.log(error);
  }
  if (isLoading) {
    console.log('Loading');
  }

  console.log(transactionsList);

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Box>
  );
};

export default Transactions;
