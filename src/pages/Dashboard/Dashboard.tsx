import { PropsWithChildren } from "react";
import { LinkGroup } from "./types";
import Sidebar from "./Sidebar";

type Props = PropsWithChildren<{ linkGroups: LinkGroup[] }>;

export default function Dashboard({ children, linkGroups }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] w-full h-full">
      <Sidebar linkGroups={linkGroups} />
      <div className="p-10 h-full">{children}</div>
    </div>
  );
}
