import { Outlet } from "react-router-dom";
import Sidebar, { SidebarOpener } from "./Sidebar";
import type { LinkGroup } from "./Sidebar/types";

export default function Layout({ linkGroups }: { linkGroups: LinkGroup[] }) {
  return (
    <div className="grid max-md:content-start md:grid-cols-[auto_1fr]">
      {/** sidebar */}
      <SidebarOpener className="md:hidden" linkGroups={linkGroups} />
      <Sidebar className="max-md:hidden" linkGroups={linkGroups} />
      {/** views */}
      <div className="px-6 py-8 md:p-10 @container">
        <Outlet />
      </div>
    </div>
  );
}
