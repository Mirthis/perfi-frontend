import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Transaction } from '../types/types';
import {
  capitalizeFirst,
  ddmmDateFormatter,
  formatCurrency,
} from '../utils/formatters';

const TransactionLineSimple = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const date = ddmmDateFormatter.format(new Date(transaction.txDate));
  const amount = formatCurrency(
    transaction.amount,
    transaction.isoCurrencyCode || 'GBP',
    0,
  );

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
      <Typography flexShrink={0} textAlign="left">
        {date}
      </Typography>
      <Typography
        flexGrow={1}
        textAlign="left"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <Link
          underline="none"
          component={RouterLink}
          to={`/transaction/${transaction.id}`}
        >
          {capitalizeFirst(transaction.name)}
        </Link>
      </Typography>
      <Typography flexShrink={0} textAlign="right">
        {amount}
      </Typography>
    </Box>
  );
};

const TransactionsListSimple = ({
  transactions,
}: {
  transactions: Transaction[];
}) => (
  <Box>
    {transactions.length === 0 && (
      <Typography>No transactions found</Typography>
    )}
    {transactions.map((t) => (
      <TransactionLineSimple transaction={t} key={t.id} />
    ))}
  </Box>
);

export default TransactionsListSimple;
