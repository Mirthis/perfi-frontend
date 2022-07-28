import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import MonthlySpendCard from './MonthlySpendCard';
import TopExpensesCard from './TopExpensesCard';

const TransactionsStats = () => {
  const { month, category, account } = useAppSelector(
    (state) => state.txFilter,
  );

  return (
    <Stack width="100%" spacing={2}>
      <Typography variant="h4">Transaction Stats</Typography>
      <MonthlySpendCard
        refMonth={month}
        months={12}
        categoryId={category}
        accountId={account}
      />
      <TopExpensesCard month={month} numberOfItems={10} />
    </Stack>
  );
};

export default TransactionsStats;
