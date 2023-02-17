import { Outlet } from "react-router-dom";
import { LinkGroup } from "./Sidebar/types";
import Sidebar, { SidebarOpener } from "./Sidebar";

export default function Layout({ linkGroups }: { linkGroups: LinkGroup[] }) {
  return (
    <div className="grid md:grid-cols-[auto_1fr]">
      {/** sidebar */}
      <SidebarOpener className="md:hidden" linkGroups={linkGroups} />
      <Sidebar className="max-md:hidden min-h-[80vh]" linkGroups={linkGroups} />
      {/** views */}
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
