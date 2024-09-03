import type { LucideProps } from "lucide-react";
import Icon from "./Icon";

export function DrawerIcon({
  isOpen,
  className,
  ...props
}: LucideProps & { isOpen: boolean }) {
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
