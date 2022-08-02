import { Card, CardContent, Typography } from '@mui/material';
import {
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from 'recharts';
import { useGetSpendingCumulativeQuery } from '../services/api';
import {
  ddmmDateFormatter,
  formatCurrency,
  selectDateFormatter,
} from '../utils/formatters';

interface DataPoint {
  date: string;
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

const renderCustomizedLabel = ({
  x,
  y,
  value,
}: {
  x?: string | number | undefined;
  y?: string | number | undefined;
  value?: string | number | undefined;
}) => {
  if (!x || !y || !value) return null;

  const offset = Number(x) < 20 ? -20 : 0;
  return (
    <text
      x={Number(x) - offset}
      y={Number(y) + 20}
      fill="#000"
      textAnchor="end"
      fontSize={12}
    >
      {formatCurrency(Number(value), 'GBP', 0)}
    </text>
  );
};

const SpendTrendCard = ({ refMonth }: { refMonth: string }) => {
  const { data: spendingTrend } = useGetSpendingCumulativeQuery(refMonth);

  const data: Array<DataPoint> = [];
  const currMonthLastDay = new Date(refMonth).getDate();
  // TODO:  create better way to merge data;
  if (spendingTrend) {
    const { cmValues, pmValues, p12Values } = spendingTrend;
    const maxLength = Math.max(
      cmValues.length,
      pmValues.length,
      p12Values.length,
    );

    for (let i = 0; i < maxLength; i += 1) {
      const dayNum = cmValues[i]?.day || pmValues[i]?.day || p12Values[i]?.day;
      const dataPoint: DataPoint = {
        date: ddmmDateFormatter.format(new Date(refMonth).setDate(dayNum)),
        pmAmount: Number(pmValues[i]?.txAmount) || data[i - 1]?.pmAmount || 0,
        p12Amount:
          Number(p12Values[i]?.txAmount) / 12 || data[i - 1]?.p12Amount || 0,
      };
      if (i < currMonthLastDay) {
        dataPoint.cmAmount =
          Number(cmValues[i]?.txAmount) || data[i - 1]?.cmAmount || 0;
      }
      if (i === currMonthLastDay - 1) {
        dataPoint.label = `${dataPoint.cmAmount}`;
        dataPoint.lastItem = true;
      }
      data.push(dataPoint);
    }
  }

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
          {/* <Stack direction="row" justifyContent="space-between">
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
          </Stack> */}
          <ResponsiveContainer height={250}>
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                type="category"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value, 'GBP', 0)}
              />
              <Legend />
              <Line
                name="Current Month"
                dataKey="cmAmount"
                // @ts-ignore
                dot={<CustomizedDot />}
                stroke="#bc92f6"
                strokeWidth={3}
              >
                <LabelList
                  dataKey="label"
                  position="bottom"
                  formatter={(value: number) => formatCurrency(value, 'GBP', 0)}
                  content={renderCustomizedLabel}
                />
              </Line>
              <Line
                name="Previous Month"
                dataKey="pmAmount"
                dot={false}
                stroke="#ff77c2"
              />
              <Line
                name="12 Month Average"
                dataKey="p12Amount"
                dot={false}
                stroke="#ff7b6f"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default SpendTrendCard;
