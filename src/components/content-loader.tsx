import type { HTMLAttributes } from "react";

export default function ContentLoader({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={
        className + " bg-gray-l4 dark:bg-gray-d1 animate-pulse rounded-sm"
      }
    />
  );
}
