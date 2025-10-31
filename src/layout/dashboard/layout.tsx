import type { ReactNode } from "react";
import { Outlet } from "react-router";
import { Sidebar, SidebarOpener } from "./sidebar";
import type { LinkGroup } from "./sidebar/types";

type DashboardLayoutProps = {
  linkGroups: LinkGroup[];
  sidebarHeader?: ReactNode;
  rootRoute: string;
};

export function Layout({
  linkGroups,
  sidebarHeader,
  rootRoute,
}: DashboardLayoutProps) {
  return (
    <div className="grid max-md:content-start md:grid-cols-[auto_1fr] border-b border-gray-l3">
      <SidebarOpener
        className="md:hidden"
        linkGroups={linkGroups}
        rootRoute={rootRoute}
      />
      <Sidebar
        className="max-md:hidden"
        linkGroups={linkGroups}
        sidebarHeader={sidebarHeader}
      />
      {/** views */}
      <div className="@container min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
