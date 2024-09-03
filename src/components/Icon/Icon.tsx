import type { LucideProps } from "lucide-react";
import { type IconType, icons } from "./icons";

interface IconProps extends LucideProps {
  type: IconType;
}

export default function Icon(props: IconProps) {
  const { type, ...rest } = props;
  const Icon = icons[type];
  return <Icon {...rest} />;
}
