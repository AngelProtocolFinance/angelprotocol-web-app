import type { LucideProps } from "lucide-react";
import { forwardRef } from "react";
import { type IconType, icons } from "./icons";

interface IconProps extends LucideProps {
  type: IconType;
}

type El = SVGSVGElement;
const Icon = forwardRef<El, IconProps>((props, ref) => {
  const { type, ...rest } = props;
  const Icon = icons[type];
  return <Icon {...rest} ref={ref} />;
});

export default Icon;
