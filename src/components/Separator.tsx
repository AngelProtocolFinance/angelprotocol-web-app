import type { PropsWithChildren } from "react";

export function Separator({
  classes = "",
  children,
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <p
      className={`flex items-center text-navy-l3 text-sm before:content-[''] before:h-px before:w-full after:content-[''] after:h-px after:w-full before:bg-gray-l2 after:bg-gray-l2  ${classes}`}
    >
      {children}
    </p>
  );
}
