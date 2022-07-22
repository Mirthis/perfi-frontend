import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TrainOutlinedIcon from '@mui/icons-material/TrainOutlined';
import ConnectingAirportsOutlinedIcon from '@mui/icons-material/ConnectingAirportsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

type CategoryIconsList = {
  [name: string]: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

const categoryIconsList: CategoryIconsList = {
  bills: ReceiptIcon,
  cash: AttachMoneyIcon,
  charity: VolunteerActivismIcon,
  drinks: LocalBarIcon,
  eating: RestaurantOutlinedIcon,
  education: SchoolIcon,
  entertainment: SportsEsportsIcon,
  finance: AccountBalanceIcon,
  groceries: LocalGroceryStoreIcon,
  health: HealthAndSafetyIcon,
  housing: HomeIcon,
  shopping: ShoppingBagOutlinedIcon,
  transfer: CurrencyExchangeIcon,
  transport: TrainOutlinedIcon,
  travel: ConnectingAirportsOutlinedIcon,
  utilties: DescriptionOutlinedIcon,
  default: CategoryIcon,
};

export default categoryIconsList;
