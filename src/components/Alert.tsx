import {
  Alert as MUIAlert,
  AlertTitle,
  Box,
  IconButton,
  Snackbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAlert } from './AlertProvider';

const Alert = () => {
  const { alertOpen, alertSeverity, alertTitle, alertMessage, clearAlert } =
    useAlert();

  return (
    // <Box>
    //   <MUIAlert onClose={() => {}} severity={severity}>
    //     {message}
    //   </MUIAlert>
    // </Box>
    <Box sx={{ my: 2 }}>
      <Snackbar
        open={alertOpen}
        onClose={() => {
          clearAlert();
        }}
      >
        <MUIAlert
          severity={alertSeverity}
          onClose={() => {
            clearAlert();
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                clearAlert();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
          {alertMessage}
        </MUIAlert>
      </Snackbar>
    </Box>
  );
};

export default Alert;
