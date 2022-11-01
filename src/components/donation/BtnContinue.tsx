import React from "react";

export function ButtonContinue({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${className} max-md:text-sm p-3 rounded btn-orange normal-case`}
      {...props}
    />
  );
}
