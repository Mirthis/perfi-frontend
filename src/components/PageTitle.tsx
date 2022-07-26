import { Box, Typography } from '@mui/material';

const PageTitle = ({ title }: { title: string }) => (
  <Box sx={{ display: 'flex' }} mb={2}>
    <Typography variant="h4">{title}</Typography>
  </Box>
);

export default PageTitle;
