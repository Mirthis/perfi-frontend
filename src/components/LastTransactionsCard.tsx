import { Card, CardContent, Typography } from '@mui/material';
import { useGetTransactionsQuery } from '../services/api';
import { getLastDayOfMonth, queryDateFormatter } from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';
import TransactionsListSimple from './TransactionsListSimple';

const LastTransactionsCard = ({
  refMonth,
  numberOfItems,
}: {
  refMonth: string;
  numberOfItems: number;
}) => {
  const monthDate = new Date(refMonth);
  const endDate = queryDateFormatter.format(getLastDayOfMonth(monthDate));

  const { data: transactions } = useGetTransactionsQuery({
    endDate,
    limit: numberOfItems,
    orderBy: 'txDate',
    onlyPositiveAmounts: true,
  });

  return (
    <Card sx={{ height: '100%' }} variant="outlined">
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
