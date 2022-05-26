import { IconBaseProps } from "react-icons";
import { iconList } from "./constants";
import { IconTypes } from "./types";

interface IconProps extends IconBaseProps {
  type: IconTypes;
}

export default function Icon(props: IconProps) {
  const { type, ...rest } = props;
  const Icon = iconList[type];
  return <Icon {...rest} />;
}
