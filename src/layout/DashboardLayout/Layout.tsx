import Seo from "components/Seo";
import ErrorBoundary from "errors/ErrorBoundary";
import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar, { SidebarOpener } from "./Sidebar";
import type { LinkGroup } from "./Sidebar/types";

type DashboardLayoutProps = {
  linkGroups: LinkGroup[];
  sidebarHeader?: ReactNode;
  rootRoute: string;
};

export default function Layout({
  linkGroups,
  sidebarHeader,
  rootRoute,
}: DashboardLayoutProps) {
  const { key } = useLocation();
  return (
    <div className="grid max-md:content-start md:grid-cols-[auto_1fr]">
      <Seo title="Admin" />
      {/** sidebar */}
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
      <div className="px-6 py-8 md:p-10 @container">
        <ErrorBoundary key={key}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}
