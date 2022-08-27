import { PropsWithChildren } from "react";
import Icon from "./Icon";

type Props = PropsWithChildren<{
  title: string;
  classes?: { container?: string; description?: string };
}>;

export function TextWarning({ children, title, classes }: Props) {
  return (
    <div className={`${classes?.container ?? ""}`}>
      <div className="flex items-center gap-2 bg-rose-100 p-2 rounded-md text-rose-500">
        <Icon type="Info" size={18} />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
