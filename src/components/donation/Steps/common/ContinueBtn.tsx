import type { ButtonHTMLAttributes } from "react";
import Icon from "../../../Icon";

export default function ContinueBtn({
  className,
  type = "button",
  text = "Continue",
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  text?: string;
}) {
  return (
    <button
      {...props}
      type={type}
      className={`btn-blue bg-[--accent-primary] hover:enabled:bg-[--accent-primary] btn-donate ${className}`}
    >
      <span className="mr-4">{text}</span>
      <Icon type="ArrowRight" className="text-lg" />
    </button>
  );
}
