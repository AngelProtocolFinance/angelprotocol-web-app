import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpFromLine,
  BadgeCheck,
  Blocks,
  ChartSpline,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Church,
  CircleAlert,
  CircleCheck,
  CircleDollarSign,
  CircleHelp,
  CircleUserRound,
  CircleX,
  Coins,
  Copy,
  CreditCard,
  Crop,
  Eye,
  EyeOff,
  FileSpreadsheet,
  Filter,
  Folder,
  Fuel,
  Gift,
  Globe,
  GripVertical,
  Heart,
  HeartHandshake,
  Hospital,
  Hourglass,
  Image,
  LayoutDashboard,
  ListCheck,
  LoaderCircle,
  Lock,
  Mail,
  MapPin,
  Menu,
  Minus,
  Moon,
  Pencil,
  PiggyBank,
  Plus,
  Save,
  Search,
  Settings,
  Shield,
  SquareArrowOutUpRight,
  Star,
  StickyNote,
  Sun,
  Timer,
  TriangleAlert,
  Undo,
  University,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";

export const icons = {
  ArrowRight: ArrowRight,
  Back: ChevronLeft,
  Charity: HeartHandshake,
  Check,
  CheckCircle: CircleCheck,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  Close: X,
  CloseCircle: CircleX,
  Coins,
  Copy,
  CreditCard,
  Crop,
  Dash: Minus,
  Dashboard: LayoutDashboard,
  DollarCircle: CircleDollarSign,
  Drag: GripVertical,
  Email: Mail,
  Exclamation: CircleAlert,
  ExternalLink: SquareArrowOutUpRight,
  Eye,
  EyeSlashed: EyeOff,
  FileCSV: FileSpreadsheet,
  FileDownload: ArrowDownToLine,
  Filter,
  Folder,
  Stocks: ChartSpline,
  GasStation: Fuel,
  Gear: Settings,
  Giftcard: Gift,
  Globe,
  Heart,
  Hospital,
  HourglassSplit: Hourglass,
  Info: CircleAlert,
  ListBox: ListCheck,
  Loading: LoaderCircle,
  MapPin,
  Menu,
  Moon,
  Next: ChevronRight,
  Padlock: Lock,
  Pencil,
  Picture: Image,
  PiggyBank,
  Plus,
  Question: CircleHelp,
  ReligiousOrganization: Church,
  Save: Save,
  Search,
  SecurityScan: Shield,
  Star,
  StickyNote,
  Sun,
  Timer,
  Undo,
  University,
  Upload: ArrowUpFromLine,
  User: CircleUserRound,
  Users: UsersRound,
  Verified: BadgeCheck,
  Wallet: Wallet,
  Warning: TriangleAlert,
  Widget: Blocks,
} as const;

export type IconType = keyof typeof icons;
