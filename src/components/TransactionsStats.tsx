import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { queryDateFormatter } from '../utils/formatters';
import MonthlySpendCard from './MonthlySpendCard';
import SpendTrendCard from './SpendTrendCard';
import TopExpensesCard from './TopExpensesCard';

const TransactionsStats = () => {
  const { month, category, account } = useAppSelector(
    (state) => state.txFilter,
  );

  const monthDate = new Date(month);
  const currDate = new Date();
  const monthIsCurrent =
    monthDate.getFullYear() === currDate.getFullYear() &&
    monthDate.getMonth() === currDate.getMonth();

  return (
    <Stack width="100%" spacing={2}>
      <Typography variant="h4">Transaction Stats</Typography>
      {monthIsCurrent && (
        <SpendTrendCard refMonth={queryDateFormatter.format(currDate)} />
      )}
      <MonthlySpendCard
        refMonth={month}
        months={12}
        categoryId={category}
        accountId={account}
      />
      <TopExpensesCard
        refMonth={month}
        numberOfItems={10}
        categoryId={category}
        accountId={account}
      />
    </Stack>
  );
};

export default TransactionsStats;
