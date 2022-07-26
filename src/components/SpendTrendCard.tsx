import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { Line, LineChart, XAxis } from 'recharts';
import { useGetSpendingTrendQuery } from '../services/api';
import { queryDateFormatter } from '../utils/formatters';

const SpendTrendCard = () => {
  const refDate = queryDateFormatter.format(new Date());
  const { data: spendingTrend } = useGetSpendingTrendQuery({ refDate });

  interface DataPoint {
    day: number;
    cmAmount?: number;
    pmAmount: number;
    p12Amount: number;
  }

  const data: Array<DataPoint> = [];
  // TODO:  create better way to merge data;
  if (spendingTrend) {
    const { cmValues, pmValues, p12Values } = spendingTrend;
    const maxLength = Math.max(
      cmValues.length,
      pmValues.length,
      p12Values.length,
    );

    for (let i = 0; i < maxLength; i += 1) {
      const dataPoint: DataPoint = {
        day: cmValues[i]?.day || pmValues[i]?.day || p12Values[i]?.day,
        pmAmount: Number(pmValues[i]?.txAmount) || data[i - 1]?.pmAmount || 0,
        p12Amount:
          Number(p12Values[i]?.txAmount) / 12 || data[i - 1]?.p12Amount || 0,
      };
      if (i < cmValues.length) {
        dataPoint.cmAmount =
          Number(cmValues[i]?.txAmount) || data[i - 1]?.cmAmount || 0;
      }
      data.push(dataPoint);
    }
  }

  console.log('data');
  console.log(data);

  if (spendingTrend) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Stack direction="row">
            <Box>
              <Typography>Current Month (to date)</Typography>
              <Typography>£600</Typography>
            </Box>
            <Box>
              <Typography>Previous Month (to date)</Typography>
              <Typography>£600</Typography>
            </Box>
            <Box>
              <Typography>12 Month Average (to date)</Typography>
              <Typography>£600</Typography>
            </Box>
          </Stack>
          <LineChart data={data} width={300} height={200}>
            <XAxis dataKey="day" />
            <Line dataKey="cmAmount" dot={false} />
            <Line dataKey="pmAmount" dot={false} />
            <Line dataKey="p12Amount" dot={false} />
          </LineChart>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default SpendTrendCard;
