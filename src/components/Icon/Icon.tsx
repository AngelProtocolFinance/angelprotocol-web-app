import type { IconBaseProps } from "react-icons";
import { type IconType, icons } from "./icons";

interface IconProps extends IconBaseProps {
  type: IconType;
}

export default function Icon(props: IconProps) {
  const { type, ...rest } = props;
  const Icon = icons[type];
  return <Icon {...rest} />;
}
