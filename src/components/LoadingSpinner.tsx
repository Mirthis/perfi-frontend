import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ text }: { text?: string }) => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
    {text && <Typography>{text}</Typography>}
  </Box>
);

export default LoadingSpinner;
