import type { ButtonHTMLAttributes } from "react";
import Icon from "../../../Icon";

export default function BackBtn({
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
  return (
    <button
      {...props}
      className={`flex items-center gap-2 font-medium text-[color:var(--accent-primary)] disabled:text-navy-l5 aria-disabled:text-navy-l5 ${className}`}
    >
      <Icon type="Back" size={18} />
      <span>Go Back</span>
    </button>
  );
}
