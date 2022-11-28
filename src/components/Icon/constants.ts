import { IconType } from "react-icons";
import {
  AiFillCaretLeft,
  AiFillCheckCircle,
  AiFillHeart,
  AiFillYoutube,
  AiOutlineCheck,
  AiOutlineCopy,
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineLike,
  AiOutlineMedium,
  AiOutlinePlus,
  AiOutlineQuestionCircle,
  AiOutlineTwitter,
  AiOutlineUpload,
} from "react-icons/ai";
import {
  BiArrowBack,
  BiBold,
  BiChevronDown,
  BiChevronUp,
  BiGlobe,
  BiItalic,
  BiSave,
  BiSearchAlt2,
  BiSun,
} from "react-icons/bi";
import {
  BsExclamationCircle,
  BsExclamationCircleFill,
  BsFilterLeft,
  BsHourglassSplit,
} from "react-icons/bs";
import { CgArrowsExchangeAltV, CgUndo } from "react-icons/cg";
import {
  FaClock,
  FaCog,
  FaDiscord,
  FaExclamation,
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaListOl,
  FaListUl,
  FaMoneyBillWave,
  FaParachuteBox,
  FaStopwatch,
  FaTelegramPlane,
  FaUserCircle,
  FaUsersCog,
} from "react-icons/fa";
import { FcSafe } from "react-icons/fc";
import { FiMenu, FiMoon } from "react-icons/fi";
import { GiPieChart, GiTwoCoins } from "react-icons/gi";
import { GoDash, GoLinkExternal } from "react-icons/go";
import { ImFilePicture } from "react-icons/im";
import { IoMdDownload, IoMdSettings } from "react-icons/io";
import {
  IoClose,
  IoCloseCircle,
  IoCrop,
  IoWalletSharp,
  IoWarning,
} from "react-icons/io5";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
  MdOutlineFileDownload,
  MdOutlineFilterAlt,
  MdOutlineUploadFile,
} from "react-icons/md";
import { RiMapPin2Line } from "react-icons/ri";
import { SiHiveBlockchain } from "react-icons/si";
import { TiArrowUnsorted } from "react-icons/ti";
import { VscLoading, VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { IconTypes } from "./types";

export const iconList: { [key in IconTypes]: IconType } = {
  FilterLeft: BsFilterLeft,
  Filter: MdOutlineFilterAlt,
  FileDownload: MdOutlineFileDownload,
  FileUpload: MdOutlineUploadFile,
  ExchangeAlt: CgArrowsExchangeAltV,
  Undo: CgUndo,
  Loading: VscLoading,
  Down: VscTriangleDown,
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  FacebookCircle: FaFacebook,
  Discord: FaDiscord,
  Plus: AiOutlinePlus,
  Telegram: FaTelegramPlane,
  Twitter: AiOutlineTwitter,
  Youtube: AiFillYoutube,
  Unsorted: TiArrowUnsorted,
  Medium: AiOutlineMedium,
  Copy: AiOutlineCopy,
  Check: AiOutlineCheck,
  Menu: FiMenu,
  Close: IoClose,
  CloseCircle: IoCloseCircle,
  Linkedin: FaLinkedin,
  LinkedinIn: FaLinkedinIn,
  Info: AiOutlineInfoCircle,
  CheckCircle: AiFillCheckCircle,
  Parachute: FaParachuteBox,
  StopWatch: FaStopwatch,
  Exclamation: FaExclamation,
  ExclamationCircle: BsExclamationCircle,
  ExclamationCircleFill: BsExclamationCircleFill,
  ExternalLink: GoLinkExternal,
  Eye: AiOutlineEye,
  EyeInvisible: AiOutlineEyeInvisible,
  CaretLeft: AiFillCaretLeft,
  Globe: BiGlobe,
  Like: AiOutlineLike,
  Dislike: AiOutlineDislike,
  Up: VscTriangleUp,
  Upload: AiOutlineUpload,
  HourglassSplit: BsHourglassSplit,
  Settings: IoMdSettings,
  Wallet: IoWalletSharp,
  Warning: IoWarning,
  ArrowBack: BiArrowBack,
  ArrowDown: BiChevronDown,
  ArrowUp: BiChevronUp,
  Back: MdOutlineArrowBackIosNew,
  Forward: MdOutlineArrowForwardIos,
  Blockchain: SiHiveBlockchain,
  Italic: BiItalic,
  Bold: BiBold,
  Cog: FaCog,
  Clock: FaClock,
  ListOl: FaListOl,
  ListUl: FaListUl,
  Search: BiSearchAlt2,
  Edit: AiOutlineEdit,
  Coins: GiTwoCoins,
  MoneyBill: FaMoneyBillWave,
  User: FaUserCircle,
  PieChart: GiPieChart,
  Safe: FcSafe,
  Admin: FaUsersCog,
  Crop: IoCrop,
  Save: BiSave,
  Moon: FiMoon,
  Sun: BiSun,
  HeartOutline: AiOutlineHeart,
  Question: AiOutlineQuestionCircle,
  HeartFill: AiFillHeart,
  Picture: ImFilePicture,
  MapPin: RiMapPin2Line,
  Dash: GoDash,
  FatArrowDownload: IoMdDownload,
};
