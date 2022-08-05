import { Card, CardContent, Stack, Typography } from '@mui/material';
import { useGetTransactionsQuery } from '../services/api';
import { GetTransactionsOptions } from '../types/types';
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  queryDateFormatter,
  selectDateFormatter,
} from '../utils/formatters';
import CardTitle from './CardTitle';
import LoadingSpinner from './LoadingSpinner';
import TransactionsListSimple from './TransactionsListSimple';

const TopExpensesCard = ({
  refMonth,
  numberOfItems,
  categoryId,
  accountId,
}: {
  refMonth: string;
  numberOfItems: number;
  categoryId?: number;
  accountId?: number;
}) => {
  const monthDate = new Date(refMonth);

  const startDate = queryDateFormatter.format(getFirstDayOfMonth(monthDate));
  const endDate = queryDateFormatter.format(getLastDayOfMonth(monthDate));

  const queryParams: GetTransactionsOptions = {
    startDate,
    endDate,
    limit: numberOfItems,
    orderBy: 'amount',
    onlyPositiveAmounts: true,
  };
  if (categoryId) queryParams.categoryIds = [categoryId];
  if (accountId) queryParams.accountIds = [accountId];

  const { data: transactions } = useGetTransactionsQuery(queryParams);

  const monthTitle = selectDateFormatter.format(monthDate);

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" gap={1} alignItems="baseline">
          <CardTitle title={`Top Expenses - ${monthTitle}`} />
          {(categoryId || accountId) && (
            <Typography variant="body2">(Filtered)</Typography>
          )}
        </Stack>
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
