import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetTransactionsQuery } from '../services/api';
import { GetTransactionsOptions } from '../types/types';
import TransactionLine from './TransactionLine';

const TransactionsList = () => {
  const { startDate, endDate, category, account } = useAppSelector(
    (state) => state.txFilter,
  );

  const queryFilter: GetTransactionsOptions = {
    startDate,
    endDate,
  };

  if (category) {
    queryFilter.categoryIds = [category];
  }

  if (account) {
    queryFilter.accountIds = [account];
  }

  const { data: transactions, isLoading } =
    useGetTransactionsQuery(queryFilter);

  if (!isLoading && transactions) {
    console.log(transactions);
  }

  if (isLoading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );

  if (transactions) {
    if (transactions.count) {
      let lastUsedDate: string = '';
      return (
        <Box>
          {transactions.rows.map((tx) => {
            const mk = (
              <Box key={tx.txDate}>
                {tx.txDate !== lastUsedDate && (
                  <Box sx={{ marginTop: 2 }} borderBottom="2px solid grey">
                    <Typography variant="h5">{tx.txDate}</Typography>
                  </Box>
                )}
                <TransactionLine key={tx.id} transaction={tx} />
              </Box>
            );

            lastUsedDate = tx.txDate;
            return mk;
          })}
        </Box>
      );
    }
    return <Typography variant="body1">No transaction found</Typography>;
  }

  return null;
};

export default TransactionsList;
