import { IconBaseProps, IconType } from "react-icons";
import { FaTelegramPlane } from "react-icons/fa";
import { RiDiscordLine } from "react-icons/ri";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiOutlineMedium,
  AiOutlineCopy,
  AiOutlineCheck,
} from "react-icons/ai";

export enum IconTypes {
  DiscordLine,
  TelegramPlane,
  OutlineTwiter,
  FillYoutube,
  OutlineMedium,
  OutlineCopy,
  OutlineCheck,
}

export const iconList: Record<IconTypes, IconType> = {
  [IconTypes.DiscordLine]: RiDiscordLine,
  [IconTypes.TelegramPlane]: FaTelegramPlane,
  [IconTypes.OutlineTwiter]: AiOutlineTwitter,
  [IconTypes.FillYoutube]: AiFillYoutube,
  [IconTypes.OutlineMedium]: AiOutlineMedium,
  [IconTypes.OutlineCopy]: AiOutlineCopy,
  [IconTypes.OutlineCheck]: AiOutlineCheck,
};

export default function Icon(props: IconBaseProps & { iconType: IconTypes }) {
  const Icon = iconList[props.iconType];
  return <Icon {...props} />;
}

export const getIcon = (type: IconTypes) => iconList[type];
