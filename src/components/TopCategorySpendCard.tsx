import { Card, CardContent, Typography } from '@mui/material';
import { useGetSpendingByCategoryLatestQuery } from '../services/api';
import { TopCategorySummaryChartData } from '../types/types';
import { formatCurrency, queryDateFormatter } from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';
import TopCategorySummaryChart from './TopCategorySpendChart';

const TopCategorySummaryCard = ({
  numberOfItems,
}: {
  numberOfItems: number;
}) => {
  const refDate = queryDateFormatter.format(new Date());
  const { data: categories } = useGetSpendingByCategoryLatestQuery(refDate);

  console.log('Top spending categories');
  console.log(categories);
  // TODO: manage different currencies
  const chartData: TopCategorySummaryChartData | undefined =
    categories?.cmValues
      .map((c) => ({
        name: c.name,
        label: formatCurrency(Number(c.txAmount), 'GBP', 0),
        cmAmount: Number(c.txAmount),
        pmAmount:
          Number(categories.pmValues.find((i) => i.id === c.id)?.txAmount) || 0,
      }))
      .sort((prev, next) => next.cmAmount - prev.cmAmount)
      .slice(0, numberOfItems);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography mb={2} variant="h6">
          Top Expenses (current month)
        </Typography>
        {chartData ? (
          <TopCategorySummaryChart data={chartData} />
        ) : (
          <LoadingSpinner />
        )}
      </CardContent>
    </Card>
  );
};

export default TopCategorySummaryCard;
