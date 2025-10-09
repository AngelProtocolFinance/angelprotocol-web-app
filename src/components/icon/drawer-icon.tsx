import { ChevronDown, type LucideProps } from "lucide-react";

export function DrawerIcon({
  is_open,
  className,
  ...props
}: LucideProps & { is_open: boolean }) {
  return (
    <ChevronDown
      {...props}
      className={`transition transform ease-in-out ${
        is_open ? "rotate-180" : "rotate-0"
      } ${className}`}
    />
  );
}
