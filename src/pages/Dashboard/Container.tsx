import { PropsWithChildren } from "react";
import { LinkGroup } from "./types";
import Sidebar from "./Sidebar";

type Props = PropsWithChildren<{ linkGroups: LinkGroup[] }>;

export default function Container({ children, linkGroups }: Props) {
  return (
    <div className="grid sm:grid-cols-[auto_1fr] w-full h-full">
      <button
        type="button"
        className="sm:hidden flex items-center gap-2 py-5 px-6 dark:bg-blue-d6 border-b border-prim font-bold text-sm"
      >
        active
      </button>
      <Sidebar linkGroups={linkGroups} className="max-sm:hidden" />
      <div className="max-sm:py-8 max-sm:px-6 sm:p-10 h-full">{children}</div>
    </div>
  );
}
