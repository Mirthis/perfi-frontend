import { useParams } from 'react-router-dom';
import { CircularProgress, Box, Typography, Stack, Grid } from '@mui/material';
import { useGetTransactionsByAccountQuery } from '../services/api';

const Transactions = () => {
  const { accountId } = useParams();

  console.log(accountId);

  const { data, error, isLoading } = useGetTransactionsByAccountQuery(
    Number(accountId),
  );

  const transactionsList = data?.rows;

  if (error) return null;
  if (isLoading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        {transactionsList &&
          transactionsList.map((t) => (
            <Grid item xs={12}>
              <Typography variant="body1">{t.name}</Typography>
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default Transactions;
