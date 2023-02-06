import { PropsWithChildren } from "react";
import { LinkGroup } from "./types";
import Sidebar from "./Sidebar";

type Props = PropsWithChildren<{ linkGroups: LinkGroup[] }>;

export default function Container({ children, linkGroups }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] w-full h-full">
      <Sidebar linkGroups={linkGroups} className="max-sm:hidden" />
      <div className="p-10 h-full">{children}</div>
    </div>
  );
}
