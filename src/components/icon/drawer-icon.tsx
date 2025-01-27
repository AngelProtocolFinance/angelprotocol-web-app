import { ChevronDown, type LucideProps } from "lucide-react";

export function DrawerIcon({
  isOpen,
  className,
  ...props
}: LucideProps & { isOpen: boolean }) {
  return (
    <ChevronDown
      {...props}
      className={`transition transform ease-in-out ${
        isOpen ? "rotate-180" : "rotate-0"
      } ${className}`}
    />
  );
}
