import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../reducers/hooks';
import { useGetTransactionsQuery } from '../services/api';
import {
  ExcludedTransactionsFilter,
  GetTransactionsOptions,
} from '../types/types';
import TransactionLine from './TransactionLine';

const TransactionsList = () => {
  const { startDate, endDate, category, account } = useAppSelector(
    (state) => state.txFilter,
  );
  const [sbowExcludedTransactions, setShowExcludedTransactions] =
    useState<ExcludedTransactionsFilter>(
      ExcludedTransactionsFilter.ONLY_INCLUDED,
    );

  const queryFilter: GetTransactionsOptions = {
    startDate,
    endDate,
    excludedTransactions: sbowExcludedTransactions,
  };

  if (category) {
    queryFilter.categoryIds = [category];
  }

  if (account) {
    queryFilter.accountIds = [account];
  }

  const { data: transactions, isLoading } =
    useGetTransactionsQuery(queryFilter);

  const toggleExcludeTransactionsView = () => {
    const excludedFilter =
      sbowExcludedTransactions === ExcludedTransactionsFilter.ONLY_EXCLUDED
        ? ExcludedTransactionsFilter.ONLY_INCLUDED
        : ExcludedTransactionsFilter.ONLY_EXCLUDED;
    setShowExcludedTransactions(excludedFilter);
  };

  let lastUsedDate: string = '';

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">
          {sbowExcludedTransactions === ExcludedTransactionsFilter.ONLY_EXCLUDED
            ? 'Excluded Transactions '
            : 'Transactions List'}
        </Typography>
        <Button variant="text" onClick={toggleExcludeTransactionsView}>
          {sbowExcludedTransactions === ExcludedTransactionsFilter.ONLY_EXCLUDED
            ? 'Transactions'
            : 'Excluded transactions'}
        </Button>
      </Box>
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {transactions &&
        transactions.count &&
        transactions.rows.map((tx) => {
          const mk = (
            <Box key={tx.id}>
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
      {transactions && !transactions.count && (
        <Typography variant="body1">No transaction found</Typography>
      )}
    </Box>
  );

  // if (isLoading)
  //   return (
  //     <Box sx={{ display: 'flex' }}>
  //       <CircularProgress />
  //     </Box>
  //   );

  // if (transactions) {
  //   if (transactions.count) {
  //     <Typography variant="h4">Transactions List</Typography>;
  //     let lastUsedDate: string = '';
  //     return (
  //       <Box>
  //         <Box />
  //         {transactions.rows.map((tx) => {
  //           const mk = (
  //             <Box key={tx.id}>
  //               {tx.txDate !== lastUsedDate && (
  //                 <Box sx={{ marginTop: 2 }} borderBottom="2px solid grey">
  //                   <Typography variant="h5">{tx.txDate}</Typography>
  //                 </Box>
  //               )}
  //               <TransactionLine key={tx.id} transaction={tx} />
  //             </Box>
  //           );

  //           lastUsedDate = tx.txDate;
  //           return mk;
  //         })}
  //       </Box>
  //     );
  //   }
  //   return <Typography variant="body1">No transaction found</Typography>;
  // }

  // return null;
};

export default TransactionsList;
