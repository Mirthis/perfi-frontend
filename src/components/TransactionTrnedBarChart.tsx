import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { useGetSpendingQuery } from '../services/api';
import {
  chartDateFormatter,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  queryDateFormatter,
} from '../utils/formatters';

const TransactionTrendBarChart = ({ month }: { month: Date }) => {
  const summaryStartDate =
    getFirstDayOfMonth(month) < getFirstDayOfMonth(new Date())
      ? getFirstDayOfMonth(month, -1)
      : getFirstDayOfMonth(month, -2);

  const summaryEndDate = getLastDayOfMonth(summaryStartDate, 2);
  const summaryStart = queryDateFormatter.format(summaryStartDate);

  const summaryEnd = queryDateFormatter.format(summaryEndDate);

  // TODO: add isLoading and error logic

  const { data: transactionsSummary } = useGetSpendingQuery({
    startDate: summaryStart,
    endDate: summaryEnd,
  });

  console.log('Transactions Summary filter: ', summaryStart, summaryEnd);
  console.log('Transactions Summary data');
  console.log(transactionsSummary);

  const cleansedData = transactionsSummary?.map((d) => {
    const date = new Date(d.year, d.month - 1);
    return {
      ...d,
      label: chartDateFormatter.format(date),
      monthKey: queryDateFormatter.format(date),
      date,
      txAmount: Number(d.txAmount) || 0,
      txCount: Number(d.txAmount),
    };
  });

  console.log('Transactions Summary cleanses data');
  console.log(cleansedData);

  return cleansedData ? (
    <BarChart
      width={500}
      height={250}
      data={cleansedData}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <XAxis dataKey="label" tick={{ fontSize: 10 }} />
      <YAxis
        type="number"
        domain={[0, 'dataMax']}
        yAxisId="left"
        orientation="left"
      />
      <YAxis
        type="number"
        domain={[0, 'dataMax']}
        yAxisId="right"
        orientation="right"
      />
      <Tooltip />
      <Legend />
      <Bar
        yAxisId="left"
        name="Total Spend"
        dataKey="txAmount"
        fill="#8884d8"
        barSize={20}
        // onClick={handleBarClick}
      >
        {cleansedData.map((entry) => (
          <Cell
            key={entry.label}
            fill={entry.date === month ? '#6664b6' : '#8884d8'}
          />
        ))}
      </Bar>
      <Bar
        yAxisId="right"
        name="Transactions Count"
        dataKey="txCount"
        fill="#82ca9d"
        barSize={20}
        // onClick={handleBarClick}
      >
        {cleansedData.map((entry) => (
          <Cell
            key={entry.label}
            fill={entry.date === month ? '#60a87b' : '#82ca9d'}
          />
        ))}
      </Bar>
    </BarChart>
  ) : null;
};

export default TransactionTrendBarChart;
