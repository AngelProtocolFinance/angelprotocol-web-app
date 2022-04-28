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
  AiOutlineTwitter,
  AiOutlineUpload,
} from "react-icons/ai";
import {
  BiArrowBack,
  BiBold,
  BiGlobe,
  BiItalic,
  BiSearchAlt2,
} from "react-icons/bi";
import {
  BsExclamationCircle,
  BsHourglassSplit,
  BsSafeFill,
} from "react-icons/bs";
import { CgArrowsExchangeAltV, CgUndo } from "react-icons/cg";
import {
  FaClock,
  FaCog,
  FaExternalLinkAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaListOl,
  FaListUl,
  FaParachuteBox,
  FaStopwatch,
  FaTelegramPlane,
  FaUserCircle,
  FaUsersCog,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GiPieChart } from "react-icons/gi";
import { GoLinkExternal } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { IoClose, IoWalletSharp, IoWarning } from "react-icons/io5";
import { IconBaseProps } from "react-icons/lib";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { RiDiscordLine } from "react-icons/ri";
import { SiHiveBlockchain } from "react-icons/si";
import { VscLoading, VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { IconTypes } from "@types-component/icons";

export const iconList: { [key in IconTypes]: IconType } = {
  ExchangeAlt: CgArrowsExchangeAltV,
  Undo: CgUndo,
  Loading: VscLoading,
  Down: VscTriangleDown,
  Facebook: FaFacebookF,
  Discord: RiDiscordLine,
  Telegram: FaTelegramPlane,
  Twitter: AiOutlineTwitter,
  Youtube: AiFillYoutube,
  Medium: AiOutlineMedium,
  Copy: AiOutlineCopy,
  Check: AiOutlineCheck,
  Menu: FiMenu,
  Close: IoClose,
  Linkedin: FaLinkedinIn,
  Link: FaExternalLinkAlt,
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
  User: FaUserCircle,
  PieChart: GiPieChart,
  Safe: BsSafeFill,
  Admin: FaUsersCog,
};

interface IconProps extends IconBaseProps {
  type: IconTypes;
}

export default function Icon(props: IconProps) {
  const { type, ...rest } = props;
  const Icon = iconList[type];
  return <Icon {...rest} />;
}

export const getIcon = (type: IconTypes) => iconList[type];
