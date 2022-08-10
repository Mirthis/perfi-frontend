import { Card, CardContent, Typography } from '@mui/material';
import { useGetSpendingCompareByCategoryQuery } from '../services/api';
import { TopCategorySummaryChartData } from '../types/types';
import { formatCurrency, selectDateFormatter } from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';
import TopCategorySummaryChart from './TopCategorySpendChart';

const TopCategorySummaryCard = ({
  refMonth,
  numberOfItems,
}: {
  refMonth: string;
  numberOfItems: number;
}) => {
  const { data: categories } = useGetSpendingCompareByCategoryQuery(refMonth);

  // TODO: manage different currencies
  const chartData: TopCategorySummaryChartData | undefined =
    categories?.cmValues
      .map((c) => ({
        categoryId: c.id,
        name: c.name,
        label: formatCurrency(Number(c.txAmount), 'GBP', 0),
        cmAmount: Number(c.txAmount),
        pmAmount:
          Number(categories.pmValues.find((i) => i.id === c.id)?.txAmount) || 0,
      }))
      .sort((prev, next) => next.cmAmount - prev.cmAmount)
      .slice(0, Math.min(numberOfItems, categories?.cmValues.length));

  const monthTitle = selectDateFormatter.format(new Date(refMonth));

  return (
    <Card sx={{ height: '100%' }} variant="outlined">
      <CardContent>
        <Typography mb={2} variant="h6">
          Top Caegories - {monthTitle}
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
