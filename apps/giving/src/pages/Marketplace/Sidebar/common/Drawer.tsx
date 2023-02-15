import { PropsWithChildren } from "react";
import { DrawerIcon } from "components/Icon";

type Props = PropsWithChildren<{
  isOpen: boolean;
  toggle(): void;
  classes?: string;
}>;
export function Drawer({ children, toggle, isOpen, classes = "" }: Props) {
  return (
    <button
      onClick={toggle}
      className={`${classes} text-left focus:outline-none w-full uppercase flex items-center justify-between gap-2`}
    >
      {children}
      <DrawerIcon isOpen={isOpen} size={20} />
    </button>
  );
}
