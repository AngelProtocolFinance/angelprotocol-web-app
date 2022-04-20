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
import { BiArrowBack, BiBold, BiGlobe, BiItalic } from "react-icons/bi";
import { BsExclamationCircle, BsHourglassSplit } from "react-icons/bs";
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
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GoLinkExternal } from "react-icons/go";
import { HiOutlineChevronDown } from "react-icons/hi";
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

export type IconTypes =
  | "Discord"
  | "Telegram"
  | "Twitter"
  | "Youtube"
  | "Medium"
  | "Facebook"
  | "Linkedin"
  | "Parachute"
  | "Link"
  | "ListUl"
  | "ListOl"
  | "Cog"
  | "Clock"
  | "Copy"
  | "Check"
  | "Menu"
  | "Close"
  | "StopWatch"
  | "Info"
  | "CheckCircle"
  | "Exclamation"
  | "CaretLeft"
  | "Like"
  | "Dislike"
  | "Upload"
  | "Wallet"
  | "Loading"
  | "ChevronDown"
  | "Down"
  | "Up"
  | "HourglassSplit"
  | "ExclamationCircle"
  | "Settings"
  | "Warning"
  | "ArrowBack"
  | "Back"
  | "Forward"
  | "Bold"
  | "Italic"
  | "Blockchain"
  | "ExternalLink"
  | "ExchangeAlt"
  | "Edit"
  | "Globe"
  | "Undo";

export const iconList: { [key in IconTypes]: IconType } = {
  ExchangeAlt: CgArrowsExchangeAltV,
  Undo: CgUndo,
  Loading: VscLoading,
  Down: VscTriangleDown,
  ChevronDown: HiOutlineChevronDown,
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
  Edit: AiOutlineEdit,
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
