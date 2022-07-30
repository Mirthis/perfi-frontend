import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MouseEventHandler } from 'react';
import { Transaction } from '../types/types';
import { amountStyle, formatCurrency } from '../utils/formatters';
import CategoryIcon from './CategoryIcon';
// import { useExcludeTransactionMutation } from '../services/api';

const TransactionLine = ({
  transaction,
  handleMenuClick,
}: {
  transaction: Transaction;
  handleMenuClick: MouseEventHandler<HTMLButtonElement>;
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
    borderTop="2px solid lightgrey"
    alignItems="flex-start"
  >
    <Grid item xs={5}>
      <Link to={`/transaction/${transaction.id}`}>
        <Typography variant="subtitle1">{transaction.name}</Typography>
      </Link>
      <Typography variant="subtitle2" minHeight="1.5em">
        {transaction.merchantName}
      </Typography>
    </Grid>
    <Grid item container xs={2} direction="column">
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <CategoryIcon name={transaction.category.iconName} />
        {/* <Typography variant="body2" display={{ xs: 'none', sm: 'flex' }}>
            {transaction.category.name}
          </Typography> */}
      </Box>
    </Grid>
    <Grid item xs={2}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <Avatar
          alt={transaction.account.name}
          src={`data:image/png;base64,${transaction.account.item.institution.logo}`}
        />
        {/* <Typography variant="body2" display={{ xs: 'none', sm: 'flex' }}>
            {transaction.account.name}
          </Typography> */}
      </Box>
    </Grid>
    <Grid item xs={2} textAlign="right">
      <Typography variant="subtitle1" sx={amountStyle(transaction.amount)}>
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
