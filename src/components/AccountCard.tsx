import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../reducers/hooks';
import { setAccountFilter } from '../reducers/txFilterReducer';
import { AccountWithStats } from '../types/types';
import { formatCurrency, capitalizeFirst } from '../utils/formatters';

const AccountCard = ({ account }: { account: AccountWithStats }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCardClick = (id: number) => {
    dispatch(setAccountFilter(id));
    navigate('/transactions');
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
        <CardContent sx={{ height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 4,
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 2,
                flexGrow: 1,
              }}
            >
              <Avatar
                src={`data:image/png;base64,${account.institutionLogo}`}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  {account.institutionName}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {account.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {account.type ? capitalizeFirst(account.type) : 'N/A'} {' / '}
                  {account.subType ? capitalizeFirst(account.subType) : 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" color="text.secondary">
                  {account.currentBalance && account.isoCurrencyCode
                    ? formatCurrency(
                        Number(account.currentBalance),
                        account.isoCurrencyCode,
                      )
                    : '-'}
                </Typography>
                <Typography variant="body2">Balance</Typography>
              </Box>
            </Box>
            <Box>
              <Divider>
                <Typography variant="subtitle1"> Spending</Typography>
              </Divider>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }} textAlign="right">
                <Typography variant="subtitle1">
                  {account.currYearAmount}
                </Typography>
                <Typography variant="body2">Year To Date</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} textAlign="right">
                <Typography variant="subtitle1">
                  {account.prevMonthAmount}
                </Typography>
                <Typography variant="body2">Previous Month</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} textAlign="right">
                <Typography variant="subtitle1">
                  {account.currMonthAmount}
                </Typography>
                <Typography variant="body2">Current Month</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AccountCard;
