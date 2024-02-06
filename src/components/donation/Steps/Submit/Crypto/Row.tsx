import { PropsWithChildren } from "react";

export function Row({
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`${classes} text-gray-d1 flex items-center justify-between w-full`}
    >
      {children}
    </div>
  );
}
