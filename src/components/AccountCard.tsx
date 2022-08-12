import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { useAppDispatch } from '../reducers/hooks';
import { setAccountFilter } from '../reducers/txFilterReducer';
import { AccountSummary } from '../types/types';
import { formatCurrency, formatAccountSubType } from '../utils/formatters';

const AccountCard = ({ account }: { account: AccountSummary }) => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCardClick = (id: number) => {
    dispatch(setAccountFilter(id));
    // navigate('/transactions');
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderLeftWidth: 4,
        borderLeftColor: account.institutionColor,
        height: '100%',
      }}
    >
      <CardActionArea
        sx={{ height: '100%' }}
        onClick={() => handleCardClick(account.id)}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-between',
            height: '100%',
            rowGap: 4,
          }}
        >
          <Stack direction="row" gap={2} flexGrow={1}>
            <Avatar src={`data:image/png;base64,${account.institutionLogo}`} />
            <Box>
              <Typography variant="body1" color="text.secondary">
                {account.institutionName}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {account.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {account.subType
                  ? formatAccountSubType(account.subType)
                  : 'N/A'}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" gap={2}>
            <Stack direction="row" gap={1} flexGrow="1" alignItems="center">
              <ReceiptLongOutlinedIcon />
              <Typography sx={{ flexGrow: 1 }} variant="body2">
                {account.txCount} Transactions
              </Typography>
            </Stack>
            <Stack direction="row" gap={1} flexGrow="1" alignItems="center">
              <PaidOutlinedIcon />
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(
                  Number(account.txAmount),
                  account.isoCurrencyCode || 'GBP',
                  0,
                )}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AccountCard;
