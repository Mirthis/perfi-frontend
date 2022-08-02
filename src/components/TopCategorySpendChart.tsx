import { Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { TopCategorySummaryChartData } from '../types/types';
import { formatCurrency } from '../utils/formatters';

const renderCustomizedLabel = ({
  x,
  y,
  width,
  height,
  value,
}: {
  x?: string | number | undefined;
  y?: string | number | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
  value?: string | number | undefined;
}) => {
  if (!x || !y || !width || !height || !value) return null;

  const fireOffset = Number(width) < 20;
  const offset = fireOffset ? -25 : 5;
  return (
    <text
      x={Number(x) + Number(width) - offset}
      y={Number(y) + Number(height) / 1.5}
      fill={fireOffset ? '#285A64' : '#fff'}
      textAnchor="end"
      fontSize={12}
    >
      {formatCurrency(Number(value), 'GBP', 0)}
    </text>
  );
};

const TopCategorySummaryChart = ({
  data,
}: {
  data: TopCategorySummaryChartData;
}) =>
  data.length > 0 ? (
    <ResponsiveContainer height={300}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" domain={[0, 'dataMax']} hide />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 10 }}
          width={100}
          tickFormatter={(entry: string) => entry.slice(0, 15)}
        />
        <Tooltip
          label="name"
          formatter={(value: number) => formatCurrency(value, 'GBP', 0)}
        />
        <Bar name="Current Month" dataKey="cmAmount" fill="#bc92f6">
          <LabelList content={renderCustomizedLabel} position="insideRight" />
        </Bar>
        <Bar name="Previous Month" dataKey="pmAmount" fill="#ff77c2">
          <LabelList content={renderCustomizedLabel} position="insideRight" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <Typography>No transactions</Typography>
  );
export default TopCategorySummaryChart;
