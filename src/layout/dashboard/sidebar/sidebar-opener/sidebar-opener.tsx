import { ChevronRight } from "lucide-react";
import type { LinkGroup } from "../types";
import ToggleableSidebar from "./toggleable-sidebar";
import useSidebarOpener from "./use-sidebar-opener";

type Props = { className?: string; linkGroups: LinkGroup[]; rootRoute: string };

export function SidebarOpener({
  className = "",
  linkGroups,
  rootRoute,
}: Props) {
  const { open, activeLink, setOpen } = useSidebarOpener(linkGroups, rootRoute);
  const Ico = activeLink.icon.fn;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`flex items-center gap-2 py-5 px-6 dark:bg-blue-d6 border-b border-gray-l4 font-bold text-sm text-blue-d1 ${className}`}
    >
      <Ico {...activeLink.icon} />
      {activeLink.title}
      <ChevronRight size={20} className="ml-auto" />
      <ToggleableSidebar
        open={open}
        linkGroups={linkGroups}
        setOpen={setOpen}
      />
    </button>
  );
}
