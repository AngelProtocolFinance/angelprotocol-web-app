import { PropsWithChildren } from "react";

export function Separator({
  classes = "",
  children,
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <p
      className={`flex items-center text-navy-l1 dark:text-gray text-sm before:content-[''] before:h-px before:w-full after:content-[''] after:h-px after:w-full before:bg-gray-d1 after:bg-gray-d1 before:dark:bg-gray after:dark:bg-gray ${classes}`}
    >
      {children}
    </p>
  );
}
