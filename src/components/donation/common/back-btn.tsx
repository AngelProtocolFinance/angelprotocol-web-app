import { ChevronLeft } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export function BackBtn({
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
  return (
    <button
      {...props}
      className={`flex relative -left-1.5 text-sm items-center font-medium text-[color:var(--accent-primary)] disabled:text-gray-l2 aria-disabled:text-gray-l2 ${className}`}
    >
      <ChevronLeft size={18} />
      <span>Go back</span>
    </button>
  );
}
