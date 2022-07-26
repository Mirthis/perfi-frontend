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
  console.log('accounts');
  console.log(accounts);
  const uniqueInstitutions = accounts
    ?.map((acc) => acc.item.institution)
    .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
  console.log('uniqueInstitutions');
  console.log(uniqueInstitutions);

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

  console.log('balances');
  console.log(balances);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {accounts && uniqueInstitutions && balances && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              {accounts.length} Linked Accounts
            </Typography>
            <Stack mt={2} direction="row" justifyContent="space-between">
              <Box>
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
                {/* <Typography>3 current accounts</Typography>
                <Typography>1 credit card</Typography>
                <Typography>1 mortgage account</Typography> */}
                {/* <Typography variant="subtitle1">
                  {uniqueInstitutions.length} linked institutions
                </Typography> */}
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
