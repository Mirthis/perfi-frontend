import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActionArea,
  Stack,
} from '@mui/material';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { useAppDispatch } from '../reducers/hooks';
import { setCategoryFilter } from '../reducers/txFilterReducer';
import { CategorySummary } from '../types/types';
import CategoryIcon from './CategoryIcon';
import { formatCurrency } from '../utils/formatters';

const CategoryCard = ({ category }: { category: CategorySummary }) => {
  const dispatch = useAppDispatch();

  const handleCardClick = (categoryId: number) => {
    dispatch(setCategoryFilter(categoryId));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderLeftWidth: 4,
        borderLeftColor: category.iconColor,
        height: '100%',
      }}
    >
      <CardActionArea
        sx={{ height: '100%' }}
        onClick={() => handleCardClick(category.id)}
      >
        <CardHeader
          avatar={
            <CategoryIcon name={category.iconName} color={category.iconColor} />
          }
          titleTypographyProps={{ variant: 'h4' }}
          title={category.name}
        />
        <CardContent>
          <Stack direction="row" gap={2}>
            <Stack direction="row" gap={1} flexGrow="1" alignItems="center">
              <ReceiptLongOutlinedIcon />
              <Typography sx={{ flexGrow: 1 }} variant="body2">
                {category.txCount} Transactions
              </Typography>
            </Stack>
            <Stack direction="row" gap={1} flexGrow="1" alignItems="center">
              <PaidOutlinedIcon />
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(Number(category.txAmount), 'GBP', 0)}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
