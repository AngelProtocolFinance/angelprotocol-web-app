import React from "react";

export function Checkbox({
  className,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <input
      {...props}
      type="checkbox"
      className={`inline-block cursor-pointer relative appearance-none border border-gray-d1 dark:border-gray-l2 rounded-sm w-4 h-4 shrink-0 checked:bg-blue checked:border-blue dark:checked:bg-blue dark:checked:border-blue ${className}`}
    />
  );
}
