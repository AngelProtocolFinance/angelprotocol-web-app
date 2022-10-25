import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { textFieldStyle } from "./constants";

export function TextField({
  className = "",
  registerReturn,
  ...props
}: Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "autoComplete"
> & {
  registerReturn: UseFormRegisterReturn;
}) {
  return (
    <input
      {...props}
      {...registerReturn}
      type="text"
      className={`${className} ${textFieldStyle}`}
      autoComplete="off"
    />
  );
}
