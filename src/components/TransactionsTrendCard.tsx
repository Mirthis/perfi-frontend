import { Card, CardContent } from '@mui/material';
import CardTitle from './CardTitle';
import TransactionTrendBarChart from './TransactionTrnedBarChart';

const TransactionTrendCard = ({ month }: { month: Date }) => {
  const title = `Spending Tremd`;
  return (
    <Card variant="outlined">
      <CardContent>
        <CardTitle title={title} />
        <TransactionTrendBarChart month={month} />
      </CardContent>
    </Card>
  );
};

export default TransactionTrendCard;
