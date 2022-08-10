import { Card, CardContent, Typography } from '@mui/material';

import { useGetSpendingCumulativeQuery } from '../services/api';
import { selectDateFormatter } from '../utils/formatters';
import SpendTrendChart from './SpendTrendChart';

const SpendTrendCard = ({ refMonth }: { refMonth: string }) => {
  const { data: spendingTrend } = useGetSpendingCumulativeQuery(refMonth);

  // TODO:  create better way to merge data;

  const monthTitle = selectDateFormatter.format(new Date(refMonth));

  // TODO: fix chart label (add curency sign and formattting)
  // TODO: fix lengend lables, proper descriptions
  // TODO: check if label on the line is visibile when close to chart margins
  // TODO:  check if cumulative can be done on the chart rather than back-end

  if (spendingTrend) {
    return (
      <Card sx={{ height: '100%' }} variant="outlined">
        <CardContent>
          <Typography mb={2} variant="h6">
            Spending - {monthTitle} - to date
          </Typography>

          <SpendTrendChart rawData={spendingTrend} refMonth={refMonth} />
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default SpendTrendCard;
