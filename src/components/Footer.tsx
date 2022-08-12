import {
  Box,
  Grid,
  useTheme,
  Link,
  Typography,
  Stack,
  Container,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const perfiLinks = [
  {
    title: 'Homepage',
    link: '/',
  },
  {
    title: 'About Perfi',
    link: '/about',
  },
  {
    title: 'Demo explained',
    link: '/demo',
  },
  {
    title: 'Term and Conditions',
    link: '/terms',
  },
];

const techLinks = [
  {
    title: 'Github repository',
    description: 'Application code',
    link: 'https://github.com/Mirthis/perfi',
  },
  {
    title: 'Plaid',
    description: 'Open banking integration',
    link: 'https://plaid.com/',
  },
  {
    title: 'Heroku',
    description: 'Hosting',
    link: 'https://www.heroku.com/',
  },
];

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.background.default}
      py={6}
      sx={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(255,255,255,0.09), rgba(255,255,255,0.09))',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} />

          <Grid
            item
            xs={12}
            md={3}
            color={theme.palette.text.secondary}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography variant="body2">
              App developed by Andrea Cardinale
            </Typography>
            <Typography variant="body2">
              &#169; 2022 - All right reserved
            </Typography>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={3}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <Typography
              variant="subtitle1"
              color={theme.palette.secondary.light}
            >
              Perfi
            </Typography>
            {perfiLinks.map((l) => (
              <Link key={l.title} component={RouterLink} to={l.link}>
                <Typography>{l.title}</Typography>
              </Link>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            display="flex"
            flexDirection="column"
            gap={1}
            color={theme.palette.text.secondary}
          >
            <Typography
              variant="subtitle1"
              color={theme.palette.secondary.light}
            >
              Tech
            </Typography>
            {techLinks.map((l) => (
              <Stack key={l.title}>
                <Link href={l.link} target="_blank">
                  <Typography>{l.title}</Typography>
                </Link>
                <Typography variant="body2">{l.description}</Typography>
              </Stack>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
