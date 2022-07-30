/* eslint-disable react/jsx-props-no-spreading */
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Popover,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { HexColorPicker } from 'react-colorful';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '../../services/api';
import { EditCategory, EditCategoryModalState } from '../../types/types';
import CategoryIcon from '../CategoryIcon';
import categoryIconsList from '../../utils/categoryIconsList';

const EditCategoryModal = ({
  state: { show, category },
  setState,
}: {
  state: EditCategoryModalState;
  setState: React.Dispatch<React.SetStateAction<EditCategoryModalState>>;
}) => {
  const [color, setColor] = useState<string>('#aabbcc');
  const [icon, setIcon] = useState<string>(category?.iconName || 'default');
  const [anchorColorPicker, setAnchorColorPicker] =
    useState<HTMLButtonElement | null>(null);
  const [anchorIconPicker, setAnchorIconPicker] =
    useState<HTMLButtonElement | null>(null);
  const iconNameList = Object.keys(categoryIconsList);
  const [
    editCategory,
    { reset: resetEditCategory, isLoading: isLoadingEditCategory },
  ] = useUpdateCategoryMutation();
  const [
    createCategory,
    { reset: resetCreateCategory, isLoading: isLoadingCreateCategory },
  ] = useCreateCategoryMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Category name is required'),
    iconName: Yup.string().required('').oneOf(iconNameList),
    iconColor: Yup.string()
      .required()
      .matches(
        /#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/,
        'Must be in the hex format (i.e.: #fff or #ffffff)',
      ),
    exclude: Yup.bool(),
  });

  const {
    register,
    setValue,
    // watch,
    setFocus,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<EditCategory>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (category) {
      setIcon(category.iconName);
      setColor(category.iconColor);
      setValue('id', category?.id);
      setValue('name', category.name);
      setValue('iconColor', category.iconColor);
      setValue('iconName', category.iconName);
      setValue('exclude', category.exclude || false);
    }
  }, [category]);

  const closeModal = () => {
    setState({ show: false, category: null });
    resetForm();
    setIcon('');
    setColor('');
    if (category) {
      resetEditCategory();
    } else {
      resetCreateCategory();
    }
  };

  const setColorField = (newColor: string) => {
    setValue('iconColor', newColor);
    setFocus('iconColor');
    setColor(newColor);
  };

  const handleColorPickerClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorColorPicker(event.currentTarget);
  };

  const handleIconPickerClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorIconPicker(event.currentTarget);
  };

  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore
    const parentDiv = event.target.closest('button');

    const categoryName = parentDiv.dataset?.categoryname;
    if (categoryName) {
      setIcon(categoryName);
      setValue('iconName', categoryName);
      setFocus('iconName');
    }
  };

  const handleColorPickerClose = () => {
    setAnchorColorPicker(null);
  };

  const handleIconPickerClose = () => {
    setAnchorIconPicker(null);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const submitForm = (data: EditCategory) => {
    if (category) {
      editCategory(data)
        .unwrap()
        .then(() => closeModal());
    } else {
      createCategory(data)
        .unwrap()
        .then(() => closeModal());
    }
  };

  const colorPickerOpen = Boolean(anchorColorPicker);
  const iconPickerOpen = Boolean(anchorIconPicker);
  const isLoading = isLoadingCreateCategory || isLoadingEditCategory;

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
            {category ? 'Edit' : 'Create'} Category
          </Typography>

          <Box
            component="form"
            noValidate
            width="100%"
            onSubmit={handleSubmit(submitForm)}
            sx={{ mt: 3 }}
          >
            <input type="hidden" id="id" {...register('id')} />
            <TextField
              required
              fullWidth
              margin="normal"
              id="name"
              label="Name"
              autoComplete="name"
              {...register('name')}
              error={errors.name !== undefined}
            />
            <Typography variant="inherit" color="error">
              {errors.name?.message}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <TextField
                  required
                  fullWidth
                  aria-readonly
                  margin="normal"
                  id="iconName"
                  label="Icon Name"
                  autoComplete="iconName"
                  {...register('iconName')}
                  error={errors.iconName !== undefined}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Typography variant="inherit" color="error">
                  {errors.iconName?.message}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={handleIconPickerClick}>
                  <CategoryIcon name={icon} color={color} />
                </IconButton>
                <Popover
                  open={iconPickerOpen}
                  anchorEl={anchorIconPicker}
                  onClose={handleIconPickerClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }} width={350}>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                    <div role="button" onClick={handleIconClick} tabIndex={0}>
                      {iconNameList.map((key) => (
                        <IconButton key={key} data-categoryname={key}>
                          <CategoryIcon name={key} fontSize={40} />
                        </IconButton>
                      ))}
                    </div>
                  </Box>
                </Popover>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: '50%' }}>
                <input
                  type="hidden"
                  id="iconColor"
                  {...register('iconColor')}
                />
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  id="iconColor"
                  label="Icon Color"
                  autoComplete="iconColor"
                  {...register('iconColor', {
                    onChange: (e) => setColor(e.target.value),
                  })}
                  error={errors.iconColor !== undefined}
                />
                <Typography variant="inherit" color="error">
                  {errors.iconColor?.message}
                </Typography>
              </Box>
              <IconButton onClick={handleColorPickerClick}>
                <ColorLensIcon sx={{ color }} fontSize="large" />
              </IconButton>
              <Popover
                open={colorPickerOpen}
                anchorEl={anchorColorPicker}
                onClose={handleColorPickerClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <Box sx={{ m: 1 }}>
                  <HexColorPicker color={color} onChange={setColorField} />
                </Box>
              </Popover>
            </Box>
            <FormGroup sx={{ ml: 2 }}>
              <FormControlLabel
                control={<Switch id="exclude" {...register('exclude')} />}
                label="Exclude all transactions in this  category from spending view"
              />
            </FormGroup>

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
                type="submit"
                loading={isLoading}
                variant="contained"
              >
                {category ? 'Edit ' : 'Create '} Category
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditCategoryModal;
