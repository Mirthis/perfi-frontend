import { Bar, XAxis, YAxis, Tooltip, BarChart, Cell } from 'recharts';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import { setMonthFilter } from '../reducers/txFilterReducer';
import { useGetSpendingByCategoryQuery } from '../services/api';
import {
  chartDateFormatter,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  queryDateFormatter,
} from '../utils/formatters';

// const getStartDate = (date: Date, monthDelta: number): Date => {
//   const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
//   startDate.setMonth(date.getMonth() + monthDelta);
//   return startDate;
// };

// const getEndDate = (date: Date, monthDelta: number): Date => {
//   const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//   endDate.setMonth(date.getMonth() + monthDelta);
//   return endDate;
// };

// const getLastDayOfMonth = (date: Date): Date =>
//   new Date(date.getFullYear(), date.getMonth() + 1, 0);

// const getStartEndDate = (month: string) => {
//   const startDate = queryDateFormatter.format(
//     getFirstDayOfMonth(new Date(month)),
//   );
//   const endDate = queryDateFormatter.format(getLastDayOfMonth(new Date(month)));
//   return { startDate, endDate };
// };

const CategorySummaryBarChart = ({ categoryId }: { categoryId: number }) => {
  const { month } = useAppSelector((state) => state.txFilter);
  const dispatch = useAppDispatch();

  const monthDate = new Date(month);

  const summaryStart = queryDateFormatter.format(
    getFirstDayOfMonth(monthDate, -9),
  );
  const summaryEnd = queryDateFormatter.format(getLastDayOfMonth(monthDate, 3));

  // TODO: add isLoading and error logic
  const { data } = useGetSpendingByCategoryQuery({
    categoryIds: [categoryId],
    startDate: summaryStart,
    endDate: summaryEnd,
  });
  const cleansedData = data
    ?.map((d) => {
      const date = new Date(d.year, d.month - 1);
      return {
        ...d,
        label: chartDateFormatter.format(date),
        monthKey: queryDateFormatter.format(date),
        date,
        txAmount: Number(d.txAmount) || 0,
      };
    })
    .filter((d) => d.date <= new Date())
    .slice(-10);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBarClick = (barData: any) => {
    console.log('bar data');
    console.log(barData);
    dispatch(setMonthFilter(barData.monthKey));
  };

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
      <text
        x={500 / 2}
        y={20}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontSize="20">Monthly spend</tspan>
      </text>
      <XAxis dataKey="label" tick={{ fontSize: 10 }} />
      <YAxis type="number" domain={[0, 'dataMax']} />
      <Tooltip />
      <Bar
        name="Total Spend"
        dataKey="txAmount"
        fill="#413ea0"
        barSize={20}
        onClick={handleBarClick}
      >
        {cleansedData.map((entry) => (
          <Cell
            key={entry.label}
            fill={entry.monthKey === month ? '#009999' : '#005599'}
          />
        ))}
      </Bar>
    </BarChart>
  ) : null;
};

export default CategorySummaryBarChart;
