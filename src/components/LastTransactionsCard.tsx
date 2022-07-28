import { Card, CardContent, Typography } from '@mui/material';
import { useGetTransactionsQuery } from '../services/api';
import { getLastDayOfMonth, queryDateFormatter } from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';
import TransactionsListSimple from './TransactionsListSimple';

const LastTransactionsCard = ({ numberOfItems }: { numberOfItems: number }) => {
  const monthDate = new Date();

  const endDate = queryDateFormatter.format(getLastDayOfMonth(monthDate));

  console.log('LastTransactionCard filters');
  console.log(`endDate ${endDate} numberOfItems ${numberOfItems}`);

  const { data: transactions } = useGetTransactionsQuery({
    endDate,
    limit: numberOfItems,
    orderBy: 'txDate',
    onlyPositiveAmounts: true,
  });

  console.log('transactions');
  console.log(transactions);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Last Transactions</Typography>
        {transactions ? (
          <TransactionsListSimple transactions={transactions.rows} />
        ) : (
          <LoadingSpinner />
        )}
      </CardContent>
    </Card>
  );
};

export default LastTransactionsCard;
