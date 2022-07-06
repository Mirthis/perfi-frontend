import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { selectDateFormatter } from '../utils/formatters';
import TransactionStatsBarChart from './TransactionStatsBarChart';

const TransactionsStats = () => {
  const { month } = useAppSelector((state) => state.txFilter);
  const monthTitle = selectDateFormatter.format(new Date(month));

  return (
    <Stack width="100%" spacing={2}>
      <Typography variant="h4">Stats for {monthTitle}</Typography>
      <TransactionStatsBarChart month={month} />
      <div>
        <Stack direction="row">
          <Typography flexGrow={1}>Total expenses:</Typography>
          <Typography textAlign="right">£440</Typography>
        </Stack>
        <Stack direction="row">
          <Typography flexGrow={1}>Total transactions:</Typography>
          <Typography textAlign="right">£440</Typography>
        </Stack>
      </div>
      <div>
        <Typography variant="h5">Top expenses</Typography>
        <Stack width="100%" direction="row">
          <Typography flexGrow={1}>Total expenses:</Typography>
          <Typography textAlign="right">£440</Typography>
        </Stack>
        <Stack width="100%" direction="row">
          <Typography flexGrow={1}>Total expenses:</Typography>
          <Typography textAlign="right">£440</Typography>
        </Stack>
        <Stack width="100%" direction="row">
          <Typography flexGrow={1}>Total expenses:</Typography>
          <Typography textAlign="right">£440</Typography>
        </Stack>
        <Stack width="100%" direction="row">
          <Typography flexGrow={1}>Total expenses:</Typography>
          <Typography textAlign="right">£440</Typography>
        </Stack>
        <Stack width="100%" direction="row">
          <Typography flexGrow={1}>Total expenses:</Typography>
          <Typography textAlign="right">£440</Typography>
        </Stack>
      </div>
    </Stack>
  );
};

export default TransactionsStats;
