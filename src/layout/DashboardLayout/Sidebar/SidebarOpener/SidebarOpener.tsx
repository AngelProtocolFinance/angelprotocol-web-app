import { ChevronRight } from "lucide-react";
import type { LinkGroup } from "../types";
import useSidebarOpener from "./useSidebarOpener";

type Props = { className?: string; linkGroups: LinkGroup[]; rootRoute: string };

export function SidebarOpener({
  className = "",
  linkGroups,
  rootRoute,
}: Props) {
  const { open, activeLink } = useSidebarOpener(linkGroups, rootRoute);
  const Ico = activeLink.icon.fn;

  return (
    <button
      type="button"
      onClick={open}
      className={`flex items-center gap-2 py-5 px-6 dark:bg-blue-d6 border-b border-gray-l4 font-bold text-sm text-blue-d1 ${className}`}
    >
      <Ico {...activeLink.icon} />
      {activeLink.title}
      <ChevronRight size={20} className="ml-auto" />
    </button>
  );
}
