import { ChevronLeft } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export default function BackBtn({
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
  return (
    <button
      {...props}
      className={`flex items-center gap-2 font-medium text-[color:var(--accent-primary)] disabled:text-navy-l5 aria-disabled:text-navy-l5 ${className}`}
    >
      <ChevronLeft size={18} />
      <span>Go Back</span>
    </button>
  );
}
