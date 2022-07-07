import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { selectDateFormatter } from '../utils/formatters';
import TopExpensesBarChart from './TopExpensesBarChart';
import TopMerchantsBarChart from './TopMerchantsBarChart';
import TransactionStatsBarChart from './TransactionStatsBarChart';

const TransactionsStats = () => {
  const { month } = useAppSelector((state) => state.txFilter);
  const monthTitle = selectDateFormatter.format(new Date(month));

  return (
    <Stack width="100%" spacing={2}>
      <Typography variant="h4">Stats for {monthTitle}</Typography>
      <TransactionStatsBarChart month={month} />
      <Typography variant="h5">Highest expenses</Typography>
      <TopExpensesBarChart month={month} numberOfItems={10} />
      <Typography variant="h5">Highest by merchant</Typography>
      <TopMerchantsBarChart month={month} numberOfItems={10} />
    </Stack>
  );
};

export default TransactionsStats;
