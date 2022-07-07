import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { useGetTransactionsQuery } from '../services/api';
import {
  formatCurrency,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  queryDateFormatter,
} from '../utils/formatters';

const TopExpensesBarChart = ({
  month,
  numberOfItems,
}: {
  month: string;
  numberOfItems: number;
}) => {
  const monthDate = new Date(month);

  const summaryStart = queryDateFormatter.format(getFirstDayOfMonth(monthDate));
  const summaryEnd = queryDateFormatter.format(getLastDayOfMonth(monthDate));

  // TODO: add isLoading and error logic

  const { data } = useGetTransactionsQuery({
    startDate: summaryStart,
    endDate: summaryEnd,
    limit: numberOfItems,
    orderBy: 'amount',
  });

  console.log('Top expenses filter: ', summaryStart, summaryEnd);
  console.log('Top expenses data');
  console.log(data);

  const cleansedData = data?.rows?.map((d) => {
    const amount = Number(d.amount);
    const name = d.merchantName || d.name;

    return {
      name,
      amount,
      label: formatCurrency(amount, d.isoCurrencyCode || 'GBP', 0),
    };
  });

  console.log('Top expenses cleanses data');
  console.log(cleansedData);

  return cleansedData ? (
    <ResponsiveContainer height={300}>
      <BarChart layout="vertical" data={cleansedData}>
        <XAxis type="number" domain={[0, 'dataMax']} hide />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 10 }}
          width={100}
          tickFormatter={(entry: string) => entry.slice(0, 15)}
        />
        <Tooltip label="name" />
        <Bar dataKey="amount" fill="#8884d8">
          <LabelList dataKey="label" fill="#ffffff" fontSize={12} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : null;
};

export default TopExpensesBarChart;
