import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  CircleCheck,
  CircleDollarSign,
  Copy,
  CreditCard,
  Crop,
  GripVertical,
  HeartHandshake,
  LayoutDashboard,
  Mail,
  Minus,
  X,
} from "lucide-react";
import {
  AiFillHeart,
  AiFillSecurityScan,
  AiFillYoutube,
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineMedium,
  AiOutlinePlus,
  AiOutlineQuestionCircle,
  AiOutlineUpload,
} from "react-icons/ai";
import { BiGlobe, BiSave, BiSearchAlt2, BiSun } from "react-icons/bi";
import {
  BsExclamationCircleFill,
  BsFilterLeft,
  BsHourglassSplit,
  BsTwitter,
} from "react-icons/bs";
import { CgUndo } from "react-icons/cg";
import {
  FaBitcoin,
  FaChurch,
  FaDiscord,
  FaExclamation,
  FaFacebook,
  FaHospital,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaStar,
  FaTelegramPlane,
  FaTiktok,
  FaUniversity,
  FaUserCircle,
} from "react-icons/fa";
import { FaFileCsv, FaGear, FaMoneyBills, FaShapes } from "react-icons/fa6";
import { FiMenu, FiMoon } from "react-icons/fi";
import { GoLinkExternal, GoSync } from "react-icons/go";
import { GrFacebookOption } from "react-icons/gr";
import { ImFilePicture } from "react-icons/im";
import { IoMdDownload, IoMdListBox } from "react-icons/io";
import {
  IoCloseCircle,
  IoEyeOffOutline,
  IoEyeOutline,
  IoPeople,
  IoWalletSharp,
  IoWarning,
} from "react-icons/io5";
import {
  MdCardGiftcard,
  MdLockOutline,
  MdOutlineFileDownload,
  MdOutlineFilterAlt,
  MdOutlineFolder,
  MdOutlineStickyNote2,
  MdOutlineUploadFile,
  MdVerified,
  MdWidgets,
} from "react-icons/md";
import { PiPaypalLogo } from "react-icons/pi";
import {
  RiFundsBoxLine,
  RiGasStationFill,
  RiMapPin2Line,
  RiPencilFill,
} from "react-icons/ri";
import { RxMixerHorizontal } from "react-icons/rx";
import { SiHiveBlockchain } from "react-icons/si";
import { VscLoading } from "react-icons/vsc";

export const icons = {
  ArrowRight: ArrowRight,
  Back: ChevronLeft,
  Bitcoin: FaBitcoin,
  Blockchain: SiHiveBlockchain,
  Charity: HeartHandshake,
  Check,
  CheckCircle: CircleCheck,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  Close: X,
  CloseCircle: IoCloseCircle,
  Copy,
  CreditCard,
  Crop,
  Dash: Minus,
  Dashboard: LayoutDashboard,
  Discord: FaDiscord,
  DollarCircle: CircleDollarSign,
  Drag: GripVertical,
  Email: Mail,
  Exclamation: FaExclamation,
  ExclamationCircleFill: BsExclamationCircleFill,
  ExternalLink: GoLinkExternal,
  Eye: IoEyeOutline,
  EyeSlashed: IoEyeOffOutline,
  Facebook: GrFacebookOption,
  FacebookCircle: FaFacebook,
  FatArrowDownload: IoMdDownload,
  FileCSV: FaFileCsv,
  FileDownload: MdOutlineFileDownload,
  FileUpload: MdOutlineUploadFile,
  Filter: MdOutlineFilterAlt,
  FilterLeft: BsFilterLeft,
  FilterMixer: RxMixerHorizontal,
  Folder: MdOutlineFolder,
  Stocks: RiFundsBoxLine,
  GasStation: RiGasStationFill,
  Gear: FaGear,
  Giftcard: MdCardGiftcard,
  Globe: BiGlobe,
  HeartFill: AiFillHeart,
  HeartOutline: AiOutlineHeart,
  Hospital: FaHospital,
  HourglassSplit: BsHourglassSplit,
  Info: AiOutlineInfoCircle,
  Instagram: FaInstagram,
  Linkedin: FaLinkedin,
  LinkedinIn: FaLinkedinIn,
  ListBox: IoMdListBox,
  Loading: VscLoading,
  MapPin: RiMapPin2Line,
  Medium: AiOutlineMedium,
  Menu: FiMenu,
  Money: FaMoneyBills,
  Moon: FiMoon,
  Next: ChevronRight,
  Padlock: MdLockOutline,
  Paypal: PiPaypalLogo,
  Pencil: RiPencilFill,
  Picture: ImFilePicture,
  Plus: AiOutlinePlus,
  Question: AiOutlineQuestionCircle,
  ReligiousOrganization: FaChurch,
  Save: BiSave,
  Search: BiSearchAlt2,
  SecurityScan: AiFillSecurityScan,
  Shapes: FaShapes,
  Star: FaStar,
  StickyNote: MdOutlineStickyNote2,
  Sun: BiSun,
  Sync: GoSync,
  Telegram: FaTelegramPlane,
  Tiktok: FaTiktok,
  Twitter: BsTwitter,
  Undo: CgUndo,
  University: FaUniversity,
  Upload: AiOutlineUpload,
  User: FaUserCircle,
  Users: IoPeople,
  Verified: MdVerified,
  Wallet: IoWalletSharp,
  Warning: IoWarning,
  Widget: MdWidgets,
  Youtube: AiFillYoutube,
} as const;

export type IconType = keyof typeof icons;
