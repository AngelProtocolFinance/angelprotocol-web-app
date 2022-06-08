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
  BsDiscord,
  BsExclamationCircle,
  BsHourglassSplit,
  BsSafeFill,
} from "react-icons/bs";
import { CgArrowsExchangeAltV, CgUndo } from "react-icons/cg";
import {
  FaClock,
  FaCog,
  FaExternalLinkAlt,
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
import { GiPieChart, GiPlainCircle, GiTwoCoins } from "react-icons/gi";
import { GoLinkExternal } from "react-icons/go";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { IoClose, IoCrop, IoWalletSharp, IoWarning } from "react-icons/io5";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
  MdOutlineFileDownload,
} from "react-icons/md";
import { RiDiscordLine } from "react-icons/ri";
import { SiHiveBlockchain } from "react-icons/si";
import { VscLoading, VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { IconTypes } from "./types";

export const iconList: { [key in IconTypes]: IconType } = {
  Admin: FaUsersCog,
  ArrowBack: BiArrowBack,
  Back: MdOutlineArrowBackIosNew,
  Blockchain: SiHiveBlockchain,
  Bold: BiBold,
  CaretLeft: AiFillCaretLeft,
  Check: AiOutlineCheck,
  CheckCircle: AiOutlineCheckCircle,
  ChevronDown: HiOutlineChevronDown,
  Circle: GiPlainCircle,
  Clock: FaClock,
  Close: IoClose,
  Cog: FaCog,
  Coins: GiTwoCoins,
  Copy: AiOutlineCopy,
  Crop: IoCrop,
  Down: VscTriangleDown,
  Discord: BsDiscord,
  DiscordLine: RiDiscordLine,
  Dislike: AiOutlineDislike,
  Edit: AiOutlineEdit,
  ExchangeAlt: CgArrowsExchangeAltV,
  Exclamation: AiOutlineExclamation,
  ExclamationCircle: BsExclamationCircle,
  ExternalLink: GoLinkExternal,
  Facebook: FaFacebookF,
  FacebookCircle: FaFacebook,
  FileDownload: MdOutlineFileDownload,
  Forward: MdOutlineArrowForwardIos,
  Globe: BiGlobe,
  HourglassSplit: BsHourglassSplit,
  Info: AiOutlineInfoCircle,
  Italic: BiItalic,
  Like: AiOutlineLike,
  Link: FaExternalLinkAlt,
  Linkedin: FaLinkedin,
  LinkedinIn: FaLinkedinIn,
  ListOl: FaListOl,
  ListUl: FaListUl,
  Loading: VscLoading,
  Medium: AiOutlineMedium,
  Menu: FiMenu,
  MoneyBill: FaMoneyBillWave,
  Parachute: FaParachuteBox,
  PieChart: GiPieChart,
  Plus: AiOutlinePlus,
  Safe: BsSafeFill,
  Save: BiSave,
  Search: BiSearchAlt2,
  Settings: IoMdSettings,
  StopWatch: FaStopwatch,
  Telegram: FaTelegramPlane,
  Twitter: AiOutlineTwitter,
  Undo: CgUndo,
  Up: VscTriangleUp,
  Upload: AiOutlineUpload,
  User: FaUserCircle,
  Wallet: IoWalletSharp,
  Warning: IoWarning,
  Youtube: AiFillYoutube,
};
