import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "autoComplete"
> & {
  registerReturn: UseFormRegisterReturn;
};

export function TextField({
  className = "",
  registerReturn,
  ...props
}: TextFieldProps) {
  return (
    <input
      {...props}
      {...registerReturn}
      type="text"
      className={className}
      autoComplete="off"
    />
  );
}
