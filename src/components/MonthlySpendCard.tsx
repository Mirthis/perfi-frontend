import { Card, CardContent } from '@mui/material';
import { LoadingSpinner, SpendingBarChart } from '.';
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
  console.log('refMonth');
  console.log(refMonth);
  console.log(new Date(refMonth));
  const startDate = queryDateFormatter.format(
    getFirstDayOfMonth(new Date(refMonth), -(months - 1)),
  );
  const endDate = queryDateFormatter.format(
    getLastDayOfMonth(new Date(refMonth)),
  );

  const queryParams: GetSpendingByOptions = { startDate, endDate };
  if (categoryId) queryParams.categoryIds = [categoryId];
  if (accountId) queryParams.accountIds = [accountId];

  console.log('Spending Card params');
  console.log(queryParams);

  const { data: spendingData, isLoading } = useGetSpendingQuery(queryParams);
  console.log('Spending Card data');
  console.log(spendingData);

  const data: SpendingChartDataPoint[] | undefined = spendingData?.map((d) => {
    const date = new Date(d.year, d.month - 1, 1);
    const amount = Number(d.txAmount);
    return {
      dateLabel: chartDateFormatter.format(date),
      amount,
      amountLabel: formatCurrency(amount, 'GBP', 0),
      count: Number(d.txCount),
    };
  });
  console.log('cleansedData');
  console.log(data);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {data && (
        <Card>
          <CardContent>
            <CardTitle title="Monthly Spending" />
            <SpendingBarChart data={data} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MonthlySpendCard;
