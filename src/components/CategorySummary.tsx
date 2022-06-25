import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CardActions,
  Button,
} from '@mui/material';
import { CategorySummaryItem } from '../types/types';
import CategoryIcon from './CategoryIcon';

const CategorySummary = ({
  summaryData,
}: {
  summaryData: CategorySummaryItem;
}) => (
  <Card variant="outlined">
    <CardHeader
      avatar={<CategoryIcon name={summaryData.iconName} />}
      titleTypographyProps={{ variant: 'h4' }}
      title={summaryData.name}
    />
    <CardContent>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ flexGrow: 1 }} variant="body2">
          {summaryData.txCount} Transactions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {summaryData.txAmount}
        </Typography>
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small">View Transactions</Button>
    </CardActions>
  </Card>
);

export default CategorySummary;
