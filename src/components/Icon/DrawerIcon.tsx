import { IconBaseProps } from "react-icons";
import Icon from ".";

export function DrawerIcon(props: IconBaseProps & { isOpen: boolean }) {
  return (
    <Icon
      {...props}
      type="ArrowDown"
      className={`transition transform ease-in-out ${
        props.isOpen ? "rotate-180" : "rotate-0"
      } ${props.className}`}
    />
  );
}
