import {
  Alert as MUIAlert,
  AlertTitle,
  Box,
  Collapse,
  IconButton,
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
    <Box sx={{ width: '100%', my: 2 }}>
      <Collapse in={alertOpen}>
        <MUIAlert
          severity={alertSeverity}
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
      </Collapse>
    </Box>
  );
};

export default Alert;
