import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

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
      <ArrowRight size={18} />
    </button>
  );
}
