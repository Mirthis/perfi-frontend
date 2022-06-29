import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { AccountGetResponseItem } from '../types/types';
import { formatCurrency, capitalizeFirst } from '../utils/numberFormatter';

const AccountCard = ({ account }: { account: AccountGetResponseItem }) => {
  const handleCardClick = (id: number) => {
    console.log(`Card for account ${id} clicked`);
  };

  console.log(account.item.institution.color);

  return (
    <Card
      variant="outlined"
      sx={{
        borderLeftWidth: 4,
        borderLeftColor: account.item.institution.color,
      }}
    >
      <CardActionArea onClick={() => handleCardClick(account.id)}>
        <CardHeader
          avatar={
            <Avatar
              src={`data:image/png;base64,${account.item.institution.logo}`}
            />
          }
          titleTypographyProps={{ variant: 'h4' }}
          title={account.name}
        />
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ flexGrow: 1 }} variant="body2">
              {account.type ? capitalizeFirst(account.type) : 'N/A'} {' / '}
              {account.subType ? capitalizeFirst(account.subType) : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {account.currentBalance && account.isoCurrencyCode
                ? formatCurrency(
                    account.currentBalance,
                    account.isoCurrencyCode,
                  )
                : '-'}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AccountCard;
