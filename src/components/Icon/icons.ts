import {
  AiFillCheckCircle,
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
import {
  BiCheck,
  BiChevronDown,
  BiChevronRight,
  BiGlobe,
  BiSave,
  BiSearchAlt2,
  BiSun,
} from "react-icons/bi";
import {
  BsExclamationCircleFill,
  BsFilterLeft,
  BsHourglassSplit,
  BsTwitter,
} from "react-icons/bs";
import { CgUndo } from "react-icons/cg";
import {
  FaChurch,
  FaDiscord,
  FaDonate,
  FaExclamation,
  FaFacebook,
  FaHospital,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaMoneyBillWave,
  FaTelegramPlane,
  FaTiktok,
  FaUniversity,
  FaUserCircle,
} from "react-icons/fa";
import { FiMenu, FiMoon } from "react-icons/fi";
import { GoDash, GoLinkExternal, GoSync } from "react-icons/go";
import { GrFacebookOption } from "react-icons/gr";
import { ImFilePicture } from "react-icons/im";
import { IoMdDownload, IoMdListBox } from "react-icons/io";
import {
  IoClose,
  IoCloseCircle,
  IoCrop,
  IoWalletSharp,
  IoWarning,
} from "react-icons/io5";
import {
  MdCardGiftcard,
  MdOutlineAdminPanelSettings,
  MdOutlineArrowBackIosNew,
  MdOutlineContentCopy,
  MdOutlineEmail,
  MdOutlineFileDownload,
  MdOutlineFilterAlt,
  MdOutlineUploadFile,
  MdSpaceDashboard,
  MdWidgets,
} from "react-icons/md";
import { RiMapPin2Line } from "react-icons/ri";
import { SiHiveBlockchain } from "react-icons/si";
import { TiArrowUnsorted } from "react-icons/ti";
import { VscLoading, VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

export const icons = {
  AdminPanel: MdOutlineAdminPanelSettings,
  ArrowRight: BiChevronRight,
  ArrowDown: BiChevronDown,
  Back: MdOutlineArrowBackIosNew,
  Blockchain: SiHiveBlockchain,
  Check: BiCheck,
  CheckCircle: AiFillCheckCircle,
  Close: IoClose,
  CloseCircle: IoCloseCircle,
  Copy: MdOutlineContentCopy,
  Crop: IoCrop,
  Dash: GoDash,
  Dashboard: MdSpaceDashboard,
  Discord: FaDiscord,
  Down: VscTriangleDown,
  Email: MdOutlineEmail,
  Exclamation: FaExclamation,
  ExclamationCircleFill: BsExclamationCircleFill,
  ExternalLink: GoLinkExternal,
  Facebook: GrFacebookOption,
  FacebookCircle: FaFacebook,
  FatArrowDownload: IoMdDownload,
  FileDownload: MdOutlineFileDownload,
  FileUpload: MdOutlineUploadFile,
  Filter: MdOutlineFilterAlt,
  FilterLeft: BsFilterLeft,
  Giftcard: MdCardGiftcard,
  Globe: BiGlobe,
  HeartFill: AiFillHeart,
  HeartOutline: AiOutlineHeart,
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
  MoneyBill: FaMoneyBillWave,
  Moon: FiMoon,
  Picture: ImFilePicture,
  Plus: AiOutlinePlus,
  Question: AiOutlineQuestionCircle,
  Save: BiSave,
  Search: BiSearchAlt2,
  SecurityScan: AiFillSecurityScan,
  Sun: BiSun,
  Sync: GoSync,
  Telegram: FaTelegramPlane,
  Tiktok: FaTiktok,
  Twitter: BsTwitter,
  Undo: CgUndo,
  Unsorted: TiArrowUnsorted,
  Up: VscTriangleUp,
  Upload: AiOutlineUpload,
  User: FaUserCircle,
  Wallet: IoWalletSharp,
  Warning: IoWarning,
  Widget: MdWidgets,
  Youtube: AiFillYoutube,
  Hospital: FaHospital,
  Charity: FaDonate,
  University: FaUniversity,
  ReligiousOrganization: FaChurch,
} as const;

export type IconType = keyof typeof icons;
