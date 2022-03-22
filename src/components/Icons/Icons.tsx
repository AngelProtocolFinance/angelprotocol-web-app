import { IconBaseProps, IconType } from "react-icons";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaParachuteBox,
  FaExternalLinkAlt,
  FaListUl,
  FaListOl,
  FaCog,
  FaClock,
  FaStopwatch,
  FaTelegramPlane,
} from "react-icons/fa";
import { RiDiscordLine } from "react-icons/ri";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiOutlineMedium,
  AiOutlineCopy,
  AiOutlineCheck,
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineExclamation,
  AiFillCaretLeft,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineUpload,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoClose, IoWalletSharp, IoWarning } from "react-icons/io5";
import { VscLoading, VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { BsHourglassSplit, BsExclamationCircle } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { CgArrowsExchangeAltV, CgUndo } from "react-icons/cg";
import { BiArrowBack, BiBold, BiItalic } from "react-icons/bi";
import { SiHiveBlockchain } from "react-icons/si";
import { GoLinkExternal } from "react-icons/go";

export enum IconTypes {
  Discord,
  Telegram,
  Twitter,
  Youtube,
  Medium,
  Facebook,
  Linkedin,
  Parachute,
  Link,
  ListUl,
  ListOl,
  Cog,
  Clock,
  Copy,
  Check,
  Menu,
  Close,
  StopWatch,
  Info,
  CheckCircle,
  Exclamation,
  CaretLeft,
  Like,
  Dislike,
  Upload,
  Wallet,
  Loading,
  Down,
  Up,
  HourglassSplit,
  ExclamationCircle,
  Settings,
  Warning,
  Back,
  Bold,
  Italic,
  Blockchain,
  ExternalLink,
  ExchangeAlt,
  Undo,
}

export const iconList: Record<IconTypes, IconType> = {
  [IconTypes.ExchangeAlt]: CgArrowsExchangeAltV,
  [IconTypes.Undo]: CgUndo,
  [IconTypes.Loading]: VscLoading,
  [IconTypes.Down]: VscTriangleDown,
  [IconTypes.Facebook]: FaFacebookSquare,
  [IconTypes.Discord]: RiDiscordLine,
  [IconTypes.Telegram]: FaTelegramPlane,
  [IconTypes.Twitter]: AiOutlineTwitter,
  [IconTypes.Youtube]: AiFillYoutube,
  [IconTypes.Medium]: AiOutlineMedium,
  [IconTypes.Copy]: AiOutlineCopy,
  [IconTypes.Check]: AiOutlineCheck,
  [IconTypes.Menu]: FiMenu,
  [IconTypes.Close]: IoClose,
  [IconTypes.Linkedin]: FaLinkedin,
  [IconTypes.Link]: FaExternalLinkAlt,
  [IconTypes.Info]: AiOutlineInfoCircle,
  [IconTypes.CheckCircle]: AiOutlineCheckCircle,
  [IconTypes.Parachute]: FaParachuteBox,
  [IconTypes.StopWatch]: FaStopwatch,
  [IconTypes.Exclamation]: AiOutlineExclamation,
  [IconTypes.ExclamationCircle]: BsExclamationCircle,
  [IconTypes.ExternalLink]: GoLinkExternal,
  [IconTypes.CaretLeft]: AiFillCaretLeft,
  [IconTypes.Like]: AiOutlineLike,
  [IconTypes.Dislike]: AiOutlineDislike,
  [IconTypes.Up]: VscTriangleUp,
  [IconTypes.Upload]: AiOutlineUpload,
  [IconTypes.HourglassSplit]: BsHourglassSplit,
  [IconTypes.Settings]: IoMdSettings,
  [IconTypes.Wallet]: IoWalletSharp,
  [IconTypes.Warning]: IoWarning,
  [IconTypes.Back]: BiArrowBack,
  [IconTypes.Blockchain]: SiHiveBlockchain,
  [IconTypes.Italic]: BiItalic,
  [IconTypes.Bold]: BiBold,
  [IconTypes.Cog]: FaCog,
  [IconTypes.Clock]: FaClock,
  [IconTypes.ListOl]: FaListOl,
  [IconTypes.ListUl]: FaListUl,
};

export default function Icon(props: IconBaseProps & { iconType: IconTypes }) {
  const Icon = iconList[props.iconType];
  return <Icon {...props} />;
}

export const getIcon = (type: IconTypes) => iconList[type];

// <Icon iconType={IconTypes.Down}
// getIcon(icon)
