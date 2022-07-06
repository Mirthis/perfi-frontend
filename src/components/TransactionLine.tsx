import { Avatar, Box, Grid, Typography } from '@mui/material';
import { TransactionData } from '../types/types';
import { amountStyle, formatCurrency } from '../utils/formatters';
import CategoryIcon from './CategoryIcon';

const TransactionLine = ({ transaction }: { transaction: TransactionData }) => (
  <Grid
    container
    key={transaction.id}
    borderTop="2px solid lightgrey"
    alignItems="flex-start"
  >
    <Grid item xs={5}>
      <Typography variant="subtitle1">{transaction.name}</Typography>
      <Typography variant="subtitle2" minHeight="1.5em">
        {transaction.merchantName}
      </Typography>
    </Grid>

    <Grid item container xs={2} direction="column">
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <CategoryIcon name={transaction.category.iconName} />
        <Typography variant="body2" display={{ xs: 'none', sm: 'flex' }}>
          {transaction.category.name}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={3}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <Avatar
          alt={transaction.account.item.institution.name}
          src={`data:image/png;base64,${transaction.account.item.institution.logo}`}
        />
        <Typography variant="body2" display={{ xs: 'none', sm: 'flex' }}>
          {transaction.account.item.institution.name}
        </Typography>
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
  </Grid>
);

export default TransactionLine;
