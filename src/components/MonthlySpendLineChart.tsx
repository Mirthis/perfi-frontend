import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { SpendingChartDataPoint } from '../types/types';
import { formatCurrency } from '../utils/formatters';

// TODO: fix y-axis to 0
const MonthlySpendLineChart = ({
  data,
}: {
  data: SpendingChartDataPoint[];
}) => {
  const amounts = data.map((i) => i.amount);
  const minValue = Math.min(...amounts);
  const maxValue = Math.max(...amounts);
  return (
    <ResponsiveContainer height={250}>
      <LineChart data={data}>
        <XAxis
          dataKey="dateLabel"
          tickLine={false}
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          interval={0}
          type="category"
          height={50}
        />
        <ReferenceLine y={0} stroke="#000000" strokeDasharray="5 5" />
        <YAxis
          type="number"
          dataKey="amount"
          domain={['dataMin', 'dataMax']}
          tickCount={5}
          ticks={[minValue, 0, maxValue / 2, maxValue]}
        />
        <Tooltip
          formatter={(value: number) => formatCurrency(value, 'GBP', 0)}
        />
        <Line name="Monthly Spend" dataKey="amount" fill="#bc92f6" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlySpendLineChart;
