import { IconBaseProps } from "react-icons";
import Icon from ".";

export function DrawerIcon({
  isOpen,
  className,
  ...props
}: IconBaseProps & { isOpen: boolean }) {
  return (
    <Icon
      {...props}
      type="ArrowDown"
      className={`transition transform ease-in-out ${
        isOpen ? "rotate-180" : "rotate-0"
      } ${className}`}
    />
  );
}
