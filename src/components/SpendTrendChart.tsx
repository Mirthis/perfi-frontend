import { useTheme } from '@mui/material';
import {
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from 'recharts';
import { GetSpendingTrendRes, SpendingTrendDataPoint } from '../types/types';
import { ddmmDateFormatter, formatCurrency } from '../utils/formatters';

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
  payload: SpendingTrendDataPoint;
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
  const theme = useTheme();

  const xOffset = Number(x) < 20 ? 30 : -5;
  const yOffset = Number(y) < 20 ? 100 : -10;
  return (
    <text
      x={Number(x) + xOffset}
      y={Number(y) + yOffset}
      fill={`${theme.palette.text.secondary}`}
      textAnchor="end"
      fontSize={12}
    >
      {formatCurrency(Number(value), 'GBP', 0)}
    </text>
  );
};

const SpendTrendChart = ({
  rawData,
  refMonth,
}: {
  rawData: GetSpendingTrendRes;
  refMonth: string;
}) => {
  const theme = useTheme();
  const data: Array<SpendingTrendDataPoint> = [];
  const currMonthLastDay = new Date(refMonth).getDate();

  const { cmValues, pmValues, p12Values } = rawData;
  const maxLength = Math.max(
    cmValues.length,
    pmValues.length,
    p12Values.length,
  );

  for (let i = 0; i < maxLength; i += 1) {
    const dayNum = cmValues[i]?.day || pmValues[i]?.day || p12Values[i]?.day;
    const dataPoint: SpendingTrendDataPoint = {
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

  return (
    <ResponsiveContainer height={300}>
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
          contentStyle={{
            background: theme.palette.background.paper,
            borderColor: theme.palette.divider,
          }}
        />
        <Legend />
        <Line
          name="Current Month"
          dataKey="cmAmount"
          // @ts-ignore
          dot={<CustomizedDot />}
          stroke={theme.palette.primary.main}
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
          stroke={theme.palette.secondary.main}
        />
        <Line
          name="12 Month Average"
          dataKey="p12Amount"
          dot={false}
          stroke={theme.palette.info.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpendTrendChart;
