import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import LocalBarOutlinedIcon from '@mui/icons-material/LocalBarOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TrainOutlinedIcon from '@mui/icons-material/TrainOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import LightbulbCircleOutlinedIcon from '@mui/icons-material/LightbulbCircleOutlined';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
// not used in default categories
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import ChildFriendlyOutlinedIcon from '@mui/icons-material/ChildFriendlyOutlined';
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';

// TODO: this is probably not good for bundle size. Research alternatives
type CategoryIconsList = {
  [name: string]: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

const categoryIconsList: CategoryIconsList = {
  bills: DescriptionOutlinedIcon,
  cash: MonetizationOnOutlinedIcon,
  charity: VolunteerActivismOutlinedIcon,
  drinks: LocalBarOutlinedIcon,
  eating: RestaurantOutlinedIcon,
  education: SchoolOutlinedIcon,
  entertainment: SportsEsportsOutlinedIcon,
  finance: AccountBalanceOutlinedIcon,
  groceries: LocalGroceryStoreOutlinedIcon,
  health: HealthAndSafetyOutlinedIcon,
  housing: HomeOutlinedIcon,
  income: AddCardOutlinedIcon,
  internal: CompareArrowsIcon,
  misc: CategoryOutlinedIcon,
  shopping: ShoppingBagOutlinedIcon,
  transfers: CurrencyExchangeIcon,
  transport: TrainOutlinedIcon,
  travel: FlightTakeoffOutlinedIcon,
  utilities: LightbulbCircleOutlinedIcon,
  default: CategoryOutlinedIcon,
  // not used in default categories
  saving: SavingsOutlinedIcon,
  receipt: ReceiptOutlinedIcon,
  pricetag: SellOutlinedIcon,
  coffee: LocalCafeOutlinedIcon,
  fastfood: FastfoodOutlinedIcon,
  child: ChildFriendlyOutlinedIcon,
  sport: SportsTennisOutlinedIcon,
  music: MusicNoteOutlinedIcon,
  medical: MedicalServicesOutlinedIcon,
};

export default categoryIconsList;
