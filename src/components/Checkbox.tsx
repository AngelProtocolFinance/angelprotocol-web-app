import React from "react";

export function Checkbox({
  className,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <input
      {...props}
      type="checkbox"
      className={`inline-block cursor-pointer disabled:cursor-default relative appearance-none border border-gray-d1 dark:border-gray-l2 rounded-sm w-4 h-4 shrink-0 checked:before:content-['✓'] before:absolute-center before:text-sm checked:bg-blue-l2 checked:text-white checked:border-blue-l2 dark:checked:bg-blue dark:checked:border-blue ${className}`}
    />
  );
}
