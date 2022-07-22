import categoryIconsList from '../utils/categoryIconsList';

const CategoryIcon = ({
  name,
  fontSize = 50,
  color,
}: {
  name: string;
  fontSize?: number;
  color?: string;
}) => {
  const categoryName = name in categoryIconsList ? name : 'default';
  const IconComponent = categoryIconsList[categoryName];

  return <IconComponent sx={{ padding: 1, fontSize, color }} />;
};

export default CategoryIcon;
