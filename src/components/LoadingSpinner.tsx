import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ text }: { text?: string }) => (
  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
    <CircularProgress />
    {text && <Typography>{text}</Typography>}
  </Box>
);

export default LoadingSpinner;
