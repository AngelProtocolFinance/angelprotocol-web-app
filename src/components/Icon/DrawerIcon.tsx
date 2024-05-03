import type { IconBaseProps } from "react-icons";
import Icon from "./Icon";

export function DrawerIcon({
  isOpen,
  className,
  ...props
}: IconBaseProps & { isOpen: boolean }) {
  return (
    <Icon
      {...props}
      type="ChevronDown"
      className={`transition transform ease-in-out ${
        isOpen ? "rotate-180" : "rotate-0"
      } ${className}`}
    />
  );
}
