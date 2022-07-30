import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CardActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from './CategoryIcon';
import { CategorySummary } from '../types/types';

const ManageCategoryCard = ({
  category,
  handleDeleteButton,
  handleEditButton,
}: {
  category: CategorySummary;
  handleDeleteButton: (category: CategorySummary) => void;
  handleEditButton: (category: CategorySummary) => void;
}) => (
  <Card variant="outlined">
    <CardHeader
      avatar={<CategoryIcon name={category.iconName} />}
      titleTypographyProps={{ variant: 'h4' }}
      title={category.name}
    />
    <CardContent>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ flexGrow: 1 }} variant="body2">
          {category.txCount} Transactions
        </Typography>
      </Box>
    </CardContent>
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button
        onClick={() => handleDeleteButton(category)}
        color="error"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Button
        onClick={() => handleEditButton(category)}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
    </CardActions>
  </Card>
);

export default ManageCategoryCard;
