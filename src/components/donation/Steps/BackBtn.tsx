import Icon from "../../Icon";
import { ButtonHTMLAttributes } from "react";

export default function BackBtn({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex items-center gap-1 font-semibold text-blue hover:text-blue-l1 active:text-blue-d1 ${className}`}
    >
      <Icon type="ArrowBack" strokeWidth={20} />
      <span>Back</span>
    </button>
  );
}
