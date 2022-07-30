import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { SpendingChartDataPoint } from '../types/types';

const MonthlySpendBarChart = ({ data }: { data: SpendingChartDataPoint[] }) => (
  <ResponsiveContainer height={300}>
    <LineChart data={data}>
      <XAxis dataKey="dateLabel" type="category" tick={{ fontSize: 10 }} />
      <YAxis type="number" dataKey="amount" domain={[0, 'dataMax']} hide />
      <Tooltip />
      <Line dataKey="amount" fill="#8884d8">
        <LabelList dataKey="amountLabel" fill="#ffffff" fontSize={12} />
      </Line>
    </LineChart>
  </ResponsiveContainer>
);

export default MonthlySpendBarChart;
