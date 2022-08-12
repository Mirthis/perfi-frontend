import { Box, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { TxFilterMode } from '../types/types';
import { queryDateFormatter } from '../utils/formatters';
import MonthlySpendCard from './MonthlySpendCard';
import SpendTrendCard from './SpendTrendCard';
import TopCategorySummaryCard from './TopCategorySpendCard';
import TopExpensesCard from './TopExpensesCard';

const TransactionsStats = () => {
  const { month, category, account, mode } = useAppSelector(
    (state) => state.txFilter,
  );

  const monthDate = new Date(month);
  const currDate = new Date('2022-04-20');
  const monthIsCurrent =
    monthDate.getFullYear() === currDate.getFullYear() &&
    monthDate.getMonth() === currDate.getMonth();

  return (
    <Stack width="100%" spacing={2}>
      <Typography variant="h4">Transaction Stats</Typography>
      {monthIsCurrent && (
        <Box>
          <SpendTrendCard refMonth={queryDateFormatter.format(currDate)} />
        </Box>
      )}

      {mode === TxFilterMode.Categories && !category && (
        <Box>
          <TopCategorySummaryCard refMonth={month} numberOfItems={5} />
        </Box>
      )}
      <Box>
        <MonthlySpendCard
          refMonth={month}
          months={12}
          categoryId={category}
          accountId={account}
        />
      </Box>
      <Box>
        <TopExpensesCard
          refMonth={month}
          numberOfItems={10}
          categoryId={category}
          accountId={account}
        />
      </Box>
    </Stack>
  );
};

export default TransactionsStats;
