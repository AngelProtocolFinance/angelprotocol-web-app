import type { ButtonHTMLAttributes } from "react";
import Icon from "../../../Icon";

export default function ContinueBtn({
  className,
  text = "Continue",
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  text?: string;
}) {
  return (
    <button
      {...props}
      className={`btn-blue bg-[--widget-accent-primary] hover:enabled:bg-[--widget-accent-primary] btn-donate ${className}`}
    >
      <span className="mr-4">{text}</span>
      <Icon type="ArrowRight" className="text-white text-lg" />
    </button>
  );
}
