import { PropsWithChildren } from "react";

export default function PreviewContainer({
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`border border-prim dark:bg-blue-d7 bg-orange-l6 p-3 rounded mb-2 mt-1 ${classes} font-work`}
    >
      {children}
    </div>
  );
}
