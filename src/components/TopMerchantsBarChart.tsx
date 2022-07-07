import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { useGetTopMechantsQuery } from '../services/api';
import {
  formatCurrency,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  queryDateFormatter,
} from '../utils/formatters';

const TopMerchantsBarChart = ({
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

  const { data } = useGetTopMechantsQuery({
    startDate: summaryStart,
    endDate: summaryEnd,
    limit: numberOfItems,
  });

  console.log('Top merchants filter: ', summaryStart, summaryEnd);
  console.log('Top merchants data');
  console.log(data);

  const cleansedData = data?.map((d) => {
    const amount = Number(d.txAmount);

    return {
      name: d.name,
      amount,
      // TODO: need to get the isoCurrency from the account
      label: formatCurrency(amount, 'GBP', 0),
    };
  });

  console.log('Top merchants cleanses data');
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

export default TopMerchantsBarChart;
