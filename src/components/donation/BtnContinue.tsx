import React from "react";

export function ButtonContinue({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${className} max-md:text-sm py-3 rounded btn-orange normal-case`}
      {...props}
    />
  );
}
