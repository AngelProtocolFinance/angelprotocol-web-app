import React from "react";

export function ButtonContinue({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${className} text-sm md:text-base py-3 rounded btn-orange normal-case`}
      {...props}
    />
  );
}
