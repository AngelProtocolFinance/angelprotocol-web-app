import { ButtonHTMLAttributes } from "react";
import Icon from "../../../Icon";

export default function BackBtn({
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
  return (
    <button
      {...props}
      className={`flex items-center gap-1 font-medium text-blue-d1 hover:text-blue active:text-blue-d2 disabled:text-navy-l5 aria-disabled:text-navy-l5 ${className}`}
    >
      <Icon type="ArrowBack" strokeWidth={20} />
      <span>Back</span>
    </button>
  );
}
