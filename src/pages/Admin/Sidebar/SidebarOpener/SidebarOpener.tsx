import Icon from "components/Icon";
import { LinkGroup } from "../types";
import useSidebarOpener from "./useSidebarOpener";

type Props = { className?: string; linkGroups: LinkGroup[] };

export function SidebarOpener({ className = "", linkGroups }: Props) {
  const { open, activeLink } = useSidebarOpener(linkGroups);

  return (
    <button
      type="button"
      onClick={open}
      className={`flex items-center gap-2 py-5 px-6 dark:bg-blue-d6 border-b border-gray-l4 font-bold text-sm text-orange ${className}`}
    >
      <Icon {...activeLink.icon} />
      {activeLink.title}
      <Icon type="ChevronRight" size={24} className="ml-auto" />
    </button>
  );
}
