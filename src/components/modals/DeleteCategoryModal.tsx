import { LoadingButton } from '@mui/lab';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import { useDeleteCategoryMutation } from '../../services/api';
import { EditCategoryModalState } from '../../types/types';
import LoadingSpinner from '../LoadingSpinner';

const DeleteCategoryModal = ({
  state: { show, category },
  setState,
}: {
  state: EditCategoryModalState;
  setState: React.Dispatch<React.SetStateAction<EditCategoryModalState>>;
}) => {
  const closeModal = () => {
    setState({ show: false, category: null });
  };

  const [deleteCategory, { isSuccess, isLoading, reset }] =
    useDeleteCategoryMutation();
  const handleSubmit = () => {
    deleteCategory(category!.id);
  };

  if (isSuccess) {
    reset();
    closeModal();
  }

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
      aria-labelledby="Delete category"
      aria-describedby="Delete category"
      open={show}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Delete Category
          </Typography>
          {!category ? (
            <LoadingSpinner />
          ) : (
            <>
              <Typography>
                Are you sure you wnt to delete category &quot;{category.name}
                &quot;?
              </Typography>
              <Typography>
                {category.txCount} transactions will be moved into the
                pre-defined category they were initially in.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                }}
                mt={2}
              >
                <Button variant="outlined" color="error" onClick={closeModal}>
                  Cancel
                </Button>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Delete Category
                </LoadingButton>
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteCategoryModal;
