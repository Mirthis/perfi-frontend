import { Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { useAppDispatch } from '../reducers/hooks';
import { setCategoryFilter, setModeFilter } from '../reducers/txFilterReducer';
import { TopCategorySummaryDataPoint, TxFilterMode } from '../types/types';
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

  const theme = useTheme();
  const fireOffset = Number(width) < 20;
  const offset = fireOffset ? -30 : 5;
  return (
    <text
      x={Number(x) + Number(width) - offset}
      y={Number(y) + Number(height) / 1.5}
      fill={fireOffset ? theme.palette.text.secondary : '#ffffff'}
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
  data: TopCategorySummaryDataPoint[];
}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDotClick = (c: CategoricalChartState) => {
    let payload: TopCategorySummaryDataPoint;
    if (c && c.activePayload) {
      payload = c.activePayload[0].payload as TopCategorySummaryDataPoint;
      dispatch(setCategoryFilter(payload.categoryId));
      dispatch(setModeFilter(TxFilterMode.Categories));
      navigate('/spending');
    }
  };

  return data.length > 0 ? (
    <ResponsiveContainer height={300}>
      <BarChart layout="vertical" data={data} onClick={handleDotClick}>
        <XAxis type="number" domain={[0, 'dataMax']} hide />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 12 }}
          width={80}
          tickFormatter={(entry: string) => entry.slice(0, 15)}
        />
        <Tooltip
          label="name"
          formatter={(value: number) => formatCurrency(value, 'GBP', 0)}
          contentStyle={{
            background: theme.palette.background.paper,
            borderColor: theme.palette.divider,
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        <Bar
          name="Current Month"
          dataKey="cmAmount"
          fill={theme.palette.primary.main}
        >
          <LabelList content={renderCustomizedLabel} position="insideRight" />
        </Bar>
        <Bar
          name="Previous Month"
          dataKey="pmAmount"
          fill={theme.palette.secondary.main}
        >
          <LabelList content={renderCustomizedLabel} position="insideRight" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <Typography>No transactions</Typography>
  );
};

export default TopCategorySummaryChart;
