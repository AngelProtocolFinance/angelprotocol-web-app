import { PropsWithChildren } from "react";
import Icon from "components/Icon";

export default function Warning({ children }: PropsWithChildren<{}>) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center p-3 pr-4 gap-3 w-full border border-prim rounded text-sm">
      <Icon type="WarningOutline" className="w-6 h-6 text-red" />
      {children}
    </div>
  );
}
