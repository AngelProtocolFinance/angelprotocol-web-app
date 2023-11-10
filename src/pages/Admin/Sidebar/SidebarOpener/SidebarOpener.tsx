import { LinkGroup } from "../types";
import Icon from "components/Icon";
import useSidebarOpener from "./useSidebarOpener";

type Props = { className?: string; linkGroups: LinkGroup[] };

export function SidebarOpener({ className = "", linkGroups }: Props) {
  const { open, activeLink } = useSidebarOpener(linkGroups);

  return (
    <button
      type="button"
      onClick={open}
      className={`flex items-center gap-2 py-5 px-6 dark:bg-blue-d3 border-b border-prim font-bold text-sm text-red ${className}`}
    >
      <Icon {...activeLink.icon} />
      {activeLink.title}
      <Icon type="ArrowRight" size={24} className="ml-auto" />
    </button>
  );
}
