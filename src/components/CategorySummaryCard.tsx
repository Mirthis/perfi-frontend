import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CardActions,
  Button,
} from '@mui/material';
import { useAppDispatch } from '../reducers/hooks';
import { setCategoryFilter } from '../reducers/txFilterReducer';
import { CategorySummary } from '../types/types';
import CategoryIcon from './CategoryIcon';

const CategorySummaryCard = ({
  summaryData,
}: {
  summaryData: CategorySummary;
}) => {
  const dispatch = useAppDispatch();

  const selectCategory = (categoryId: number) => {
    dispatch(setCategoryFilter(categoryId));
  };

  return (
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
        <Button size="small" onClick={() => selectCategory(summaryData.id)}>
          View Transactions
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategorySummaryCard;
