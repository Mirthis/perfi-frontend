import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import DeleteCategoryModal from '../components/modals/DeleteCategoryModal';
import EditCategoryModal from '../components/modals/EditCategoryModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ManageCategoryCard from '../components/ManageCategoryCard';
import { useGetUserCategoriesQuery } from '../services/api';
import { EditCategoryModalState, CategorySummary } from '../types/types';

const ManageCategories = () => {
  const { data: userCategories, isLoading } = useGetUserCategoriesQuery();
  const [deleteModal, setDeleteModal] = useState<EditCategoryModalState>({
    show: false,
    category: null,
  });
  const [editModal, setEditModal] = useState<EditCategoryModalState>({
    show: false,
    category: null,
  });

  const showDeleteModal = (category: CategorySummary) => {
    setDeleteModal({ show: true, category });
  };

  const showEditModal = (category: CategorySummary | null) => {
    setEditModal({ show: true, category });
  };

  return (
    <Box>
      <DeleteCategoryModal state={deleteModal} setState={setDeleteModal} />
      <EditCategoryModal state={editModal} setState={setEditModal} />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Typography variant="h4">User created categories</Typography>
        <Button variant="contained" onClick={() => showEditModal(null)}>
          Create category
        </Button>
      </Box>
      {isLoading && <LoadingSpinner />}
      {userCategories && (
        <Grid container rowSpacing={2} columnSpacing={2}>
          {userCategories.map((c) => (
            <Grid key={c.id} item xs={12} sm={6} md={4}>
              <ManageCategoryCard
                category={c}
                handleDeleteButton={showDeleteModal}
                handleEditButton={showEditModal}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ManageCategories;
