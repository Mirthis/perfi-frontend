import categoryIconsList from '../utils/categoryIconsList';

const CategoryIcon = ({ name }: { name: string }) => {
  const IconComponent = categoryIconsList[name];

  return <IconComponent sx={{ padding: '4px' }} fontSize="large" />;
};

export default CategoryIcon;
