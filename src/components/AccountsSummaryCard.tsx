import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../reducers/hooks';
import { setAccountFilter, setModeFilter } from '../reducers/txFilterReducer';
import { useGetAccountsQuery } from '../services/api';
import { TxFilterMode } from '../types/types';
import { formatCurrency } from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';

const AccountsSummaryCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: accounts, isLoading } = useGetAccountsQuery();
  const ACCOUNTS_TO_SHOW = 5;

  const debitAccountTypes = ['credit', 'loan'];
  const uniqueInstitutions = accounts
    ?.map((acc) => acc.item.institution)
    .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);

  const theme = useTheme();

  const balances = accounts?.reduce(
    (bal, acc) => {
      const balance = Number(acc.currentBalance || 0);
      if (debitAccountTypes.includes(acc.type)) {
        return {
          credit: bal.credit,
          debit: bal.debit + balance,
        };
      }
      return {
        debit: bal.debit,
        credit: bal.credit + balance,
      };
    },
    {
      credit: 0,
      debit: 0,
    },
  );

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(setModeFilter(TxFilterMode.Accounts));
    dispatch(setAccountFilter(Number(event.currentTarget.dataset.accountid)));
    navigate('/spending');
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {accounts && uniqueInstitutions && balances && (
        <Card sx={{ height: '100%' }} variant="outlined">
          <CardContent>
            <Typography mb={2} variant="h6">
              Accounts summary
            </Typography>

            <Stack mt={2} direction="column">
              <Typography variant="subtitle2" component="div">
                {accounts.length} Accounts tracked / {uniqueInstitutions.length}{' '}
                Linked Institutions
              </Typography>
              {accounts
                .slice()
                .sort(
                  (prev, next) =>
                    (next.currentBalance || Number.MIN_VALUE) -
                    (prev.currentBalance || Number.MIN_VALUE),
                )
                .slice(0, ACCOUNTS_TO_SHOW) // TODO: extract number to a constant
                .map((a) => (
                  <Stack key={a.id} direction="row" alignItems="center" gap={1}>
                    <Avatar
                      alt={a.name}
                      src={`data:image/png;base64,${a.item.institution.logo}`}
                    />
                    <Button
                      sx={{
                        textTransform: 'none',
                        flexGrow: 1,
                        justifyContent: 'flex-start',
                      }}
                      onClick={handleAccountClick}
                      data-accountid={a.id}
                    >
                      <Typography
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        color={theme.palette.text.secondary}
                      >
                        {a.name}
                      </Typography>
                    </Button>

                    {a.currentBalance && (
                      <Typography flexShrink={0}>
                        {formatCurrency(a.currentBalance, 'GBP', 0)}
                      </Typography>
                    )}
                  </Stack>
                ))}
              {accounts.length > ACCOUNTS_TO_SHOW && (
                <Typography variant="body2" ml={2}>
                  + {accounts.length - ACCOUNTS_TO_SHOW} more
                </Typography>
              )}
              {/* <Box flexGrow={1}>
                <Stack direction="column" gap={2} textAlign="right">
                  <Box color="green">
                    <Typography variant="h6">
                      {formatCurrency(balances.credit, 'GBP', 0)}
                    </Typography>
                    <Typography variant="subtitle2">Credit</Typography>
                  </Box>
                  <Box color="red">
                    <Typography variant="h6">
                      {formatCurrency(balances.debit, 'GBP', 0)}
                    </Typography>
                    <Typography variant="subtitle2">Debit</Typography>
                  </Box>
                </Stack>
              </Box> */}
            </Stack>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AccountsSummaryCard;
