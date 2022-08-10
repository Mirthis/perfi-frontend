import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Line,
  LineChart,
  XAxis,
  // YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { useAppDispatch } from '../reducers/hooks';
import { setModeFilter, setMonthFilter } from '../reducers/txFilterReducer';
import { SpendingChartDataPoint, TxFilterMode } from '../types/types';
import { formatCurrency } from '../utils/formatters';

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

  const offset = Number(x) < 20 ? 50 : -5;
  return (
    <text
      x={Number(x) + offset}
      y={Number(y) + 15}
      fill="#000"
      textAnchor="end"
      fontSize={12}
    >
      {value}
    </text>
  );
};

// TODO: fix y-axis to 0
const MonthlySpendLineChart = ({
  data,
}: {
  data: SpendingChartDataPoint[];
}) => {
  const theme = useTheme();
  const amounts = data.map((i) => i.amount);
  const minValue = Math.min(...amounts);
  const maxValue = Math.max(...amounts);
  const minIndex = data.findIndex((d) => d.amount === minValue);
  const maxIndex = data.findIndex((d) => d.amount === maxValue);

  const cleansedData = data.map((a, i) => ({
    ...a,
    amountLabel: i === minIndex || i === maxIndex ? a.amountLabel : undefined,
  }));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDotClick = (c: CategoricalChartState) => {
    let payload: SpendingChartDataPoint;
    if (c && c.activePayload) {
      payload = c.activePayload[0].payload as SpendingChartDataPoint;
      dispatch(setMonthFilter(payload.date));
      dispatch(setModeFilter(TxFilterMode.Categories));
      navigate('/spending');
    }
  };

  return (
    // const amounts = data.map((i) => i.amount);
    // const minValue = Math.min(...amounts);
    // const maxValue = Math.max(...amounts);
    <ResponsiveContainer height={300}>
      <LineChart
        data={cleansedData}
        onClick={handleDotClick}
        // margin={{ top: 0, left: 30, right: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="dateLabel"
          tickLine={false}
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          // interval={0}
          type="category"
          height={50}
        />

        {/* <YAxis
          type="number"
          dataKey="amount"
          domain={['dataMin', 'dataMax']}
          tickCount={5}
          ticks={[minValue, 0, maxValue / 2, maxValue]}
        /> */}
        <Tooltip
          formatter={(value: number) => formatCurrency(value, 'GBP', 0)}
          contentStyle={{
            background: theme.palette.background.paper,
            borderColor: theme.palette.divider,
          }}
        />
        <Line
          name="Monthly Spend"
          dataKey="amount"
          stroke={theme.palette.primary.main}
        >
          <LabelList
            dataKey="amountLabel"
            position="top"
            content={renderCustomizedLabel}
          />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlySpendLineChart;
