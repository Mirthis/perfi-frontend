import categoryIconsList from '../utils/categoryIconsList';

const CategoryIcon = ({
  name,
  fontSize = 50,
}: {
  name: string;
  fontSize?: number;
}) => {
  const IconComponent = categoryIconsList[name];

  return <IconComponent sx={{ padding: 1, fontSize }} />;
};

export default CategoryIcon;
