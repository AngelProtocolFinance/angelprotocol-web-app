import "react-router-dom";
import { Outlet } from "react-router-dom";
import { LayoutProps } from "./types";
import Sidebar from "./Sidebar";
import SidebarOpener from "./SidebarOpener";

export default function Layout({ linkGroups }: LayoutProps) {
  return (
    <div className={`grid md:grid-cols-[auto_1fr] md:divide-x md:divide-prim`}>
      <SidebarOpener classes="md:hidden" linkGroups={linkGroups} />
      {/** sidebar */}
      <Sidebar
        linkGroups={linkGroups}
        classes="hidden md:grid md:content-start"
      />
      {/** views */}
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
