import { IconBaseProps } from "react-icons";
import { IconTypes } from "@types-component/icons";
import { iconList } from "./constants";

interface IconProps extends IconBaseProps {
  type: IconTypes;
}

export default function Icon(props: IconProps) {
  const { type, ...rest } = props;
  const Icon = iconList[type];
  return <Icon {...rest} />;
}
