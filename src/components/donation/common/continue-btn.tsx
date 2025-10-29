import type { ButtonHTMLAttributes } from "react";

export function ContinueBtn({
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
      className={`btn btn-blue normal-case enabled:bg-(--accent-primary) ${className}`}
    >
      {text}
    </button>
  );
}
