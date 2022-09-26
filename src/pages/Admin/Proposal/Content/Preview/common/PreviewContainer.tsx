import { PropsWithChildren } from "react";

export default function PreviewContainer({
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`bg-white/10 shadow-inner p-2 rounded-md mb-2 mt-1 ${classes}`}
    >
      {children}
    </div>
  );
}
