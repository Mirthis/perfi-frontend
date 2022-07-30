import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { LabelList, Line, LineChart, XAxis } from 'recharts';
import { useGetSpendingCumulativeQuery } from '../services/api';

interface DataPoint {
  day: number;
  cmAmount?: number;
  pmAmount: number;
  p12Amount: number;
  label?: string;
  lastItem?: boolean;
}

const CustomizedDot = ({
  cx,
  cy,
  stroke,
  payload,
}: // value,
{
  cx: number;
  cy: number;
  stroke: string;
  payload: DataPoint;
  // value: number;
}) => {
  // const { cx, cy, stroke, payload, value } = props;
  if (payload.lastItem) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={3}
        stroke={stroke}
        strokeWidth={1}
        fill="black"
        textAnchor=""
      />
    );
  }

  return null;
};

const SpendTrendCard = ({ refMonth }: { refMonth: string }) => {
  const { data: spendingTrend } = useGetSpendingCumulativeQuery(refMonth);

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
      if (i === cmValues.length - 1) {
        dataPoint.label = `${dataPoint.cmAmount}`;
        dataPoint.lastItem = true;
      }
      data.push(dataPoint);
    }
  }

  if (spendingTrend) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography mb={2} variant="h6">
            Spending trend - to date
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Box sx={{ flexGrow: 1 }}>
              <Typography>This Month</Typography>
              <Typography>£600</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography>Last Month</Typography>
              <Typography>£600</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography>12 Month Average</Typography>
              <Typography>£600</Typography>
            </Box>
          </Stack>
          <LineChart data={data} width={300} height={200}>
            <XAxis dataKey="day" />
            <Line
              dataKey="cmAmount"
              // @ts-ignore
              dot={<CustomizedDot />}
              // @ts-ignore
            >
              <LabelList dataKey="label" position="bottom" />
            </Line>
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
