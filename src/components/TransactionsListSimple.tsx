import { Box, Typography } from '@mui/material';
import { Transaction } from '../types/types';
import { ddmmDateFormatter, formatCurrency } from '../utils/formatters';

const TransactionLineSimple = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const nameLength = 20;
  const date = ddmmDateFormatter.format(new Date(transaction.txDate));
  const name =
    transaction.name.length > nameLength
      ? `${transaction.name.slice(0, nameLength)}...`
      : transaction.name;
  const amount = formatCurrency(
    transaction.amount,
    transaction.isoCurrencyCode || 'GBP',
    0,
  );

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
      <Typography textAlign="left">{date}</Typography>
      <Typography sx={{ flexGrow: 1 }} textAlign="left">
        {name}
      </Typography>
      <Typography textAlign="right">{amount}</Typography>
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
