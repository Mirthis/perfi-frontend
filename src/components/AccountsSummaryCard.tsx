import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useGetAccountsQuery } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const AccountsSummaryCard = () => {
  const { data: accounts, isLoading } = useGetAccountsQuery();

  const debitAccountTypes = ['credit', 'loan'];
  const uniqueInstitutions = accounts
    ?.map((acc) => acc.item.institution)
    .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);

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

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {accounts && uniqueInstitutions && balances && (
        <Card sx={{ height: '100%' }} variant="outlined">
          <CardContent>
            <Typography mb={2} variant="h6">
              Accounts summary
            </Typography>

            <Stack mt={2} direction="row" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle2" component="div">
                  {accounts.length} Accounts tracked /{' '}
                  {uniqueInstitutions.length} Linked Institutions
                </Typography>
                <Stack direction="row" justifyContent="flex-start">
                  <AvatarGroup max={4}>
                    {uniqueInstitutions!.map((i) => (
                      <Avatar
                        key={i.id}
                        alt={i.name}
                        src={`data:image/png;base64,${i.logo}`}
                      />
                    ))}
                  </AvatarGroup>
                </Stack>
              </Box>
              <Box>
                <Stack direction="column" gap={2} textAlign="right">
                  <Box color="green">
                    <Typography variant="h6">{balances.credit}</Typography>
                    <Typography variant="subtitle2">Credit</Typography>
                  </Box>
                  <Box color="red">
                    <Typography variant="h6">{balances.debit}</Typography>
                    <Typography variant="subtitle2">Debit</Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AccountsSummaryCard;
