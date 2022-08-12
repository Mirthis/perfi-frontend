import { Box, Link, Typography } from '@mui/material';
import { PageTitle } from '../components';

const About = () => (
  <Box maxWidth="md" m="auto">
    <PageTitle title="About Perfi" />
    <Typography variant="h5">Why this project?</Typography>
    <Typography>
      Pefi has been created by myself, Andrea, as a way to put my recently
      acquired fullstack development knowledge into practice by building an
      actual application.
    </Typography>
    <Typography>
      I wanted to create something different from the usual portfolio friendly
      app and at the same time I wanted to develop something complex enough to
      be challenging, test my knowledge and help me to gain confidence as a full
      stack developer.
    </Typography>
    <Typography>
      Regarding the acutal idea, I use to track my budget and spending
      regularly, and tried several apps that alllow to do this, but alwasy felt
      a bit underwhelmed by one aspect or the other. Having said this, it was at
      the end of the day a friend suggestion that got me started.
    </Typography>
    <Typography mt={2} variant="h5">
      Current development status
    </Typography>
    <Typography>
      As you probably realized by now the app is not public and you can only
      browse the demo. This is due to the following factors:
      <ol>
        <li>
          There are a couple of limitation I am facing with the api provided by
          Plaid that require addressing and for which I am in contact with
          Plaid. Specifically:
          <li>
            History data for certain institutions seems to only cover 3-4 months
            instead of the usual 24 months. History would build over time but
            for a new user this would create a skewed historic view
          </li>
          <li>
            Transactions in a currency different from the account currency do
            not have the original currency amount (as long as I am aware off)
          </li>
          <li>
            Account permissions change and renewal require some clarifications
          </li>
        </li>
        <li>
          Perfi needs to store financial data to allow categorisations and
          analytics. Due to the nature of the data this requires a specific
          audit and approval before the app can be released to the pubblic.
        </li>
        <li>
          The overall app has gone through really basic manual testing and
          before an actual roll out it will require the creation of an automated
          testing suit and testing by a larger user base.
        </li>
      </ol>
    </Typography>
    <Typography mt={2} variant="h5">
      Future steps
    </Typography>
    <Typography>
      I cannot say for sure.
      <br /> I think I kind of achieved what I wanted with the project but I
      would really love to get this live, so as I move to some other projects I
      will also try to follow up on the points mentioned above and see what
      happens. If anyone is interested in collaborating and help push this over
      the line, please reach out to me from my{' '}
      <Link href="https://github.com/Mirthis" target="_blank">
        github profile
      </Link>
      .
    </Typography>
  </Box>
);

export default About;
