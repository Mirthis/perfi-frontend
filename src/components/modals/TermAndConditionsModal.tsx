import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import CardTitle from '../CardTitle';

const TermAndConditionsModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', sm: 600 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="Terms  and Conditions"
      aria-describedby="Terms  and Conditions"
      open={showModal}
      onClose={() => setShowModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={showModal}>
        <Box sx={style}>
          <CardTitle title="Terms and Conditions" />
          <Typography>TBD</Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TermAndConditionsModal;
