import { Card, CardContent, Stack, Typography } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';
import MonthlySpendLineChart from './MonthlySpendLineChart';
import { useGetSpendingQuery } from '../services/api';
import { GetSpendingByOptions, SpendingChartDataPoint } from '../types/types';
import {
  chartDateFormatter,
  formatCurrency,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  queryDateFormatter,
} from '../utils/formatters';
import CardTitle from './CardTitle';

const MonthlySpendCard = ({
  refMonth,
  months,
  categoryId,
  accountId,
}: {
  refMonth: string;
  months: number;
  categoryId?: number;
  accountId?: number;
}) => {
  const startDate = queryDateFormatter.format(
    getFirstDayOfMonth(new Date(refMonth), -(months - 1)),
  );
  const endDate = queryDateFormatter.format(
    getLastDayOfMonth(new Date(refMonth)),
  );

  const queryParams: GetSpendingByOptions = { startDate, endDate };
  if (categoryId) queryParams.categoryIds = [categoryId];
  if (accountId) queryParams.accountIds = [accountId];

  const { data: spendingData, isLoading } = useGetSpendingQuery(queryParams);

  const data: SpendingChartDataPoint[] | undefined = spendingData
    ?.map((d) => {
      const date = new Date(d.year, d.month - 1, 1);
      const amount = Number(d.txAmount);
      return {
        dateObj: date,
        date: queryDateFormatter.format(date),
        dateLabel: chartDateFormatter.format(date),
        amount: Math.round(amount),
        amountLabel: formatCurrency(amount, 'GBP', 0),
        count: Number(d.txCount),
      };
    })
    .sort((prev, next) => Number(prev.dateObj) - Number(next.dateObj));
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {data && (
        <Card sx={{ height: '100%' }} variant="outlined">
          <CardContent>
            <Stack direction="row" gap={1} alignItems="baseline">
              <CardTitle title="Monthly Spending" />
              {(categoryId || accountId) && (
                <Typography variant="body2">(Filtered)</Typography>
              )}
            </Stack>
            <MonthlySpendLineChart data={data} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MonthlySpendCard;
