import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { PageTitle } from '../components';

const About = () => (
  <Box maxWidth="md" m="auto">
    <PageTitle title="Demo Explained" />
    <Typography variant="h5">Why is this even a thing?</Typography>
    <Typography>
      The demo is a quick way for people to see how the apps works with a set of
      dummy data without having to register and connect their financial
      institution accounts.
    </Typography>
    <Typography>
      Also, the app is not currently open for sign-up so that iss the best way
      to showcase it. You can find more details on the current development
      status in the{' '}
      <Link component={RouterLink} to="/about">
        about page
      </Link>
      .
    </Typography>
    <Typography mt={2} variant="h5">
      About the demo account
    </Typography>
    <Typography>
      When you click on try demo a temporary account is created with a set of
      pre-defined dummy data. Credentials for the account are not shared and
      therefore It is not possible to log in if the user get signed out. The
      created user session will last until the browser is closed and demo
      accounts are purged from the backend regularly.
    </Typography>
    <Typography mt={2} variant="h5">
      Features not available in the demo
    </Typography>
    <Typography>
      Following features are not available:
      <ul>
        <li>
          User account management (i.e.: sign-in, sign-up, email verification,
          password reset)
        </li>
        <li>
          Financial institution account management (i.e.: link a new financial
          institution, refresh data, update account access)
        </li>
      </ul>
    </Typography>
  </Box>
);

export default About;
