import { DrawerIcon } from "components/Icon";

type Props = {
  title: string;
  isOpen: boolean;
  toggle(): void;
  classes?: string;
};
export function Drawer({ toggle, isOpen, classes = "", title }: Props) {
  return (
    <button
      onClick={toggle}
      className={`${classes} focus:outline-none w-full font-heading uppercase text-sm flex items-center justify-between gap-2`}
    >
      <span className="text-xs font-bold">{title}</span>
      <DrawerIcon isOpen={isOpen} size={20} />
    </button>
  );
}
