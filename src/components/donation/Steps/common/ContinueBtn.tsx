import type { ButtonHTMLAttributes } from "react";
import Icon from "../../../Icon";

export default function ContinueBtn({
  className,
  text = "Continue",
  isLoading,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  text?: string;
  isLoading?: boolean;
}) {
  return (
    <button {...props} className={`btn-blue btn-donate ${className}`}>
      <span className="mr-4">{text}</span>
      <Icon
        type={isLoading ? "Loading" : "ArrowRight"}
        className={`text-white text-lg ${isLoading ? "animate-spin" : ""}`}
      />
    </button>
  );
}
