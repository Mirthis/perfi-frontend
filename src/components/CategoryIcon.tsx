import categoryIconsList from '../utils/categoryIconsList';

const CategoryIcon = ({ name }: { name: string }) => {
  const IconComponent = categoryIconsList[name];

  return <IconComponent />;
};

export default CategoryIcon;
