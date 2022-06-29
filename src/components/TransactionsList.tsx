import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetTransactionsQuery } from '../services/api';
import { GetTransactionsOptions } from '../types/types';

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
              <>
                {tx.txDate !== lastUsedDate && (
                  <Box sx={{ marginTop: 2, borderBottom: '1px' }}>
                    <Typography variant="h5">{tx.txDate}</Typography>
                  </Box>
                )}
                <Box
                  key={tx.id}
                  sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                >
                  <div>{tx.merchantName}</div>
                  <div>{tx.name}</div>
                  <div>{tx.amount}</div>
                </Box>
              </>
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
