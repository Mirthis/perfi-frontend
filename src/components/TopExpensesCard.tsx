import { Card, CardContent, Typography } from '@mui/material';
import { useGetTransactionsQuery } from '../services/api';
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  queryDateFormatter,
} from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';
import TransactionsListSimple from './TransactionsListSimple';

const TopExpensesCard = ({
  refMonth,
  numberOfItems,
}: {
  refMonth: string;
  numberOfItems: number;
}) => {
  const monthDate = new Date(refMonth);

  const startDate = queryDateFormatter.format(getFirstDayOfMonth(monthDate));
  const endDate = queryDateFormatter.format(getLastDayOfMonth(monthDate));

  const { data: transactions } = useGetTransactionsQuery({
    startDate,
    endDate,
    limit: numberOfItems,
    orderBy: 'amount',
    onlyPositiveAmounts: true,
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography mb={2} variant="h6">
          Top Expenses (current month)
        </Typography>
        {transactions ? (
          <TransactionsListSimple transactions={transactions.rows} />
        ) : (
          <LoadingSpinner />
        )}
      </CardContent>
    </Card>
  );
};

export default TopExpensesCard;
