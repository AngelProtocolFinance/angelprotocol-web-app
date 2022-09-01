import { IconType } from "react-icons";
import {
  AiFillCaretLeft,
  AiFillYoutube,
  AiOutlineCheck,
  AiOutlineCheckCircle,
  AiOutlineCopy,
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineExclamation,
  AiOutlineInfoCircle,
  AiOutlineLike,
  AiOutlineMedium,
  AiOutlinePlus,
  AiOutlineTwitter,
  AiOutlineUpload,
} from "react-icons/ai";
import {
  BiArrowBack,
  BiBold,
  BiGlobe,
  BiItalic,
  BiSave,
  BiSearchAlt2,
} from "react-icons/bi";
import {
  BsExclamationCircle,
  BsHourglassSplit,
  BsSafeFill,
} from "react-icons/bs";
import { BsFilterLeft } from "react-icons/bs";
import { CgArrowsExchangeAltV, CgUndo } from "react-icons/cg";
import {
  FaClock,
  FaCog,
  FaDiscord,
  FaFacebook,
  FaFacebookF,
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
import { FiMenu } from "react-icons/fi";
import { GiPieChart, GiTwoCoins } from "react-icons/gi";
import { GoLinkExternal } from "react-icons/go";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { IoClose, IoCrop, IoWalletSharp, IoWarning } from "react-icons/io5";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
  MdOutlineFileDownload,
} from "react-icons/md";
import { SiHiveBlockchain } from "react-icons/si";
import { VscLoading, VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { IconTypes } from "./types";

export const iconList: { [key in IconTypes]: IconType } = {
  FilterLeft: BsFilterLeft,
  FileDownload: MdOutlineFileDownload,
  ExchangeAlt: CgArrowsExchangeAltV,
  Undo: CgUndo,
  Loading: VscLoading,
  Down: VscTriangleDown,
  ChevronDown: HiOutlineChevronDown,
  Facebook: FaFacebookF,
  FacebookCircle: FaFacebook,
  Discord: FaDiscord,
  Plus: AiOutlinePlus,
  Telegram: FaTelegramPlane,
  Twitter: AiOutlineTwitter,
  Youtube: AiFillYoutube,
  Medium: AiOutlineMedium,
  Copy: AiOutlineCopy,
  Check: AiOutlineCheck,
  Menu: FiMenu,
  Close: IoClose,
  Linkedin: FaLinkedin,
  LinkedinIn: FaLinkedinIn,
  Info: AiOutlineInfoCircle,
  CheckCircle: AiOutlineCheckCircle,
  Parachute: FaParachuteBox,
  StopWatch: FaStopwatch,
  Exclamation: AiOutlineExclamation,
  ExclamationCircle: BsExclamationCircle,
  ExternalLink: GoLinkExternal,
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
  Safe: BsSafeFill,
  Admin: FaUsersCog,
  Crop: IoCrop,
  Save: BiSave,
};
