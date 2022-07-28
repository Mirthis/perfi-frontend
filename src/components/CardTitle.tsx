import { Box, Typography } from '@mui/material';

const CardTitle = ({ title }: { title: string }) => (
  <Box sx={{ display: 'flex' }} mb={2}>
    <Typography variant="h6">{title}</Typography>
  </Box>
);

export default CardTitle;
