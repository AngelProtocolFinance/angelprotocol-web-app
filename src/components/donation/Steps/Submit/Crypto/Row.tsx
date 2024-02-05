import { PropsWithChildren } from "react";

export function Row({
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`${classes} text-gray-d1 py-3 flex items-center justify-between w-full border-b border-prim last:border-none`}
    >
      {children}
    </div>
  );
}
