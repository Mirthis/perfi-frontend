import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { LoadingButton } from '@mui/lab';
// import { useNavigate } from 'react-router-dom';
import { useCareteDemoAccountMutation } from '../services/api';
import { LoadingSpinner } from '../components';
import { setUser } from '../reducers/authReducer';
import { useAppDispatch } from '../reducers/hooks';

const Home = () => {
  const [createDemoAccount, { isLoading }] = useCareteDemoAccountMutation();

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createAccount = async () => {
    const user = await createDemoAccount().unwrap();
    dispatch(setUser(user));
  };

  return (
    <>
      <Box>
        <Stack direction="row">
          <Box flexGrow={1}>
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
              <Button variant="contained">Create an Account</Button>
            </Stack>
            {isLoading && <LoadingSpinner text="Creating demo account..." />}
          </Box>
          <Box flexGrow={1}>Image goes here</Box>
        </Stack>
      </Box>
      <Box mt={4}>
        <Typography textAlign="center" variant="h4" color="primary">
          Features
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Box bgcolor="#26a69a" borderRadius={5} p={2}>
              <QueryStatsIcon
                sx={{
                  fontSize: 100,
                  color: '#ffffff',
                }}
              />
            </Box>
            <Typography>Charts</Typography>
            <Typography>Blablablabla</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box bgcolor="#26a69a" borderRadius={5} p={2}>
              <CategoryIcon
                sx={{
                  fontSize: 100,
                  color: '#ffffff',
                }}
              />
            </Box>
            <Typography>Organize</Typography>
            <Typography>Blab la bl abla</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box bgcolor="#26a69a" borderRadius={5} p={2}>
              <AccountBalanceIcon
                sx={{
                  fontSize: 100,
                  color: '#ffffff',
                }}
              />
            </Box>
            <Typography>Charts</Typography>
            <Typography>Blablablabla</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
