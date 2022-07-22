import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
