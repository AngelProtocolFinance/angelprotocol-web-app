import { ChevronRight } from "lucide-react";
import type { LinkGroup } from "../types";
import { ToggleableSidebar } from "./toggleable-sidebar";
import { use_sidebar_opener } from "./use-sidebar-opener";

type Props = { className?: string; linkGroups: LinkGroup[]; rootRoute: string };

export function SidebarOpener({
  className = "",
  linkGroups,
  rootRoute,
}: Props) {
  const { open, active_link, set_open } = use_sidebar_opener(
    linkGroups,
    rootRoute
  );
  const Ico = active_link.icon.fn;

  return (
    <button
      type="button"
      onClick={() => set_open(true)}
      className={`flex items-center gap-2 py-5 px-6 dark:bg-blue-d6 border-b border-gray-l3 font-bold text-sm text-blue-d1 ${className}`}
    >
      <Ico {...active_link.icon} />
      {active_link.title}
      <ChevronRight size={20} className="ml-auto" />
      <ToggleableSidebar
        open={open}
        linkGroups={linkGroups}
        setOpen={set_open}
      />
    </button>
  );
}
