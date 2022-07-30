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

const TopCategorySummaryChart = ({
  data,
}: {
  data: TopCategorySummaryChartData;
}) => (
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
      <Tooltip label="name" />
      <Bar dataKey="cmAmount" fill="#8884d8">
        <LabelList dataKey="label" fill="#ffffff" fontSize={12} />
      </Bar>
      <Bar dataKey="pmAmount" fill="#8884d8">
        <LabelList dataKey="label" fill="#ffffff" fontSize={12} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default TopCategorySummaryChart;
