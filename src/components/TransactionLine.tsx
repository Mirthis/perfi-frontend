import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MouseEventHandler } from 'react';
import { Transaction } from '../types/types';
import { formatCurrency } from '../utils/formatters';
import CategoryIcon from './CategoryIcon';
// import { useExcludeTransactionMutation } from '../services/api';

const TransactionLine = ({
  transaction,
  handleMenuClick,
  handleCategoryClick,
  handleAccountClick,
}: {
  transaction: Transaction;
  handleMenuClick: MouseEventHandler<HTMLButtonElement>;
  handleCategoryClick: MouseEventHandler<HTMLButtonElement>;
  handleAccountClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  // const [excludeTrasnaction, { data }] = useExcludeTransactionMutation();

  // const hideTransaction = () => {
  //   excludeTrasnaction({
  //     transactionId: transaction.id,
  //     exclude: !transaction.exclude,
  //   });
  // };

  <Grid
    container
    key={transaction.id}
    borderTop="1px solid grey"
    alignItems="center"
  >
    <Grid item xs={5}>
      <Link
        underline="none"
        to={`/transaction/${transaction.id}`}
        component={RouterLink}
      >
        <Typography variant="subtitle1">{transaction.name}</Typography>
      </Link>
      {transaction.merchantName && (
        <Typography variant="subtitle2" minHeight="1.5em">
          {transaction.merchantName}
        </Typography>
      )}
    </Grid>
    <Grid item xs={3} sm={2}>
      <Box textAlign="center">
        <Button
          onClick={handleCategoryClick}
          data-categoryid={transaction.category.id}
        >
          <CategoryIcon
            name={transaction.category.iconName}
            color={transaction.category.iconColor}
          />
        </Button>
      </Box>
    </Grid>
    <Grid item sm={2} display={{ xs: 'none', sm: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
        textAlign="center"
      >
        <Button
          onClick={handleAccountClick}
          data-accountid={transaction.account.id}
        >
          <Avatar
            alt={transaction.account.name}
            src={`data:image/png;base64,${transaction.account.item.institution.logo}`}
          />
        </Button>
        {/* <Typography variant="body2" display={{ xs: 'none', sm: 'flex' }}>
            {transaction.account.name}
          </Typography> */}
      </Box>
    </Grid>
    <Grid item xs={3} sm={2} textAlign="right">
      <Typography variant="subtitle1" fontWeight="bold">
        {formatCurrency(
          transaction.amount,
          transaction.isoCurrencyCode || 'GBP',
        )}
      </Typography>
    </Grid>
    <Grid item xs={1} textAlign="right">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
        data-transactionid={transaction.id}
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </IconButton>
    </Grid>
    {/* <Grid item xs={1} textAlign="right" onClick={() => hideTransaction()}>
        <IconButton color="primary">
          {transaction.exclude ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </Grid> */}
  </Grid>
);
export default TransactionLine;
