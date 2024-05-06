import { Outlet } from "react-router-dom";
import Sidebar, { SidebarOpener } from "./Sidebar";
import type { LinkGroup } from "./Sidebar/types";
import { ReactNode } from "react";


export type DashboardLayoutProps = {
  linkGroups: LinkGroup[]
  sidebarHeader?:ReactNode
}

export default function Layout({ linkGroups, sidebarHeader }: DashboardLayoutProps) {
  return (
    <div className="grid max-md:content-start md:grid-cols-[auto_1fr]">
      {/** sidebar */}
      <SidebarOpener className="md:hidden" linkGroups={linkGroups} />
      <Sidebar className="max-md:hidden" linkGroups={linkGroups} sidebarHeader={sidebarHeader} />
      {/** views */}
      <div className="px-6 py-8 md:p-10 @container">
        <Outlet />
      </div>
    </div>
  );
}
