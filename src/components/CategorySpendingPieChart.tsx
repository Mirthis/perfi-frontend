import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Grocery', value: 400 },
  { name: 'Housing', value: 300 },
  { name: 'Eating Out', value: 300 },
  { name: 'Shopping', value: 300 },
  { name: 'Utilities', value: 300 },
  { name: 'Others', value: 200 },
];

const renderLabel = (entry: { name: string; value: number }) => {
  console.log(entry);
  return `${entry.name} - ${entry.value}`;
};

const CategorySpendingPieChart = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <ResponsiveContainer width={800} height={400}>
      <PieChart>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            value={data[0].value}
            position="center"
            fill="grey"
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              fontFamily: 'Roboto',
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategorySpendingPieChart;
