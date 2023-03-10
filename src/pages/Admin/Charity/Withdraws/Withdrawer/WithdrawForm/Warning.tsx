import { PropsWithChildren } from "react";
import Icon from "components/Icon";

export default function Warning({
  classes = "",
  children,
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`${classes} grid grid-cols-[auto_1fr] items-center gap-3 w-full p-3 pr-4 border border-prim rounded text-sm`}
    >
      <Icon type="WarningOutline" className="w-6 h-6 text-red" />
      {children}
    </div>
  );
}
