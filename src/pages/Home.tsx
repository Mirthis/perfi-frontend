import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { LoadingButton } from '@mui/lab';
// import { useNavigate } from 'react-router-dom';
import { useCareteDemoAccountMutation } from '../services/api';
import { LoadingSpinner } from '../components';
import { setUser } from '../reducers/authReducer';
import { useAppDispatch } from '../reducers/hooks';
import { DEMO_ONLY } from '../utils/config';

const Home = () => {
  const [createDemoAccount, { isLoading }] = useCareteDemoAccountMutation();

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const createAccount = async () => {
    const user = await createDemoAccount().unwrap();
    dispatch(setUser(user));
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h3">
          Get on top of your spending with Perfi
        </Typography>
        <Typography variant="h6">
          All your accounts and expenses in a single place, easy to track,
          organize and analyse.
        </Typography>
        <Stack mt={2} ml={4} direction="row" gap={2}>
          <LoadingButton
            loading={isLoading}
            onClick={createAccount}
            variant="outlined"
          >
            Try Demo
          </LoadingButton>
          <Button variant="contained" disabled={DEMO_ONLY}>
            Create an Account
          </Button>
        </Stack>
        {isLoading && <LoadingSpinner text="Creating demo account..." />}
      </Box>
      <Box mt={10}>
        <Grid container rowSpacing={6} columnSpacing={4}>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={2}
          >
            <Box bgcolor={theme.palette.primary.light} borderRadius={5} p={5}>
              <QueryStatsIcon
                sx={{
                  fontSize: 100,
                  color: '#ffffff',
                }}
              />
            </Box>
            <Typography color={theme.palette.primary.light}>
              Track your spending
            </Typography>
            <Box px={10}>
              <Typography>
                Bring all your financial accounts data together in a single
                place.
              </Typography>
              <Typography>
                Get a clear view of where your money is going and how your
                spending habits change over time.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={2}
          >
            <Box borderRadius={5} bgcolor={theme.palette.primary.main} p={4}>
              <CategoryIcon
                sx={{
                  fontSize: 120,
                  color: '#ffffff',
                }}
              />
            </Box>
            <Typography color={theme.palette.primary.main}>
              Get organized
            </Typography>
            <Box px={10}>
              <Typography>
                Organize your spend with our pre-build category or create the
                one that makes more sense to you.
              </Typography>

              <Typography>
                Control which category and individual transasctions need to be
                included in your spending summaries.
              </Typography>
              <Typography>
                And as you classify your data Perfi learns from your choice and
                apply them to new transactions.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={2}
          >
            <Box borderRadius={5} bgcolor={theme.palette.primary.dark} p={4}>
              <AccountBalanceIcon
                sx={{
                  fontSize: 120,
                  color: '#ffffff',
                }}
              />
            </Box>
            <Typography variant="subtitle1" color={theme.palette.primary.dark}>
              Open Banking
            </Typography>
            <Box px={10}>
              <Typography>
                Your financial data are accessed via{' '}
                <Link target="_blank" href="https://plaid.com/en-gb/">
                  Plaid
                </Link>{' '}
                leveraging{' '}
                <Link target="_blank" href="https://www.openbanking.org.uk/">
                  Open Banking
                </Link>
                , meaning that you never have to share your account credentials
                with us, you decide through your financnial institution what to
                share and you can revoke access to your data at any time.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
