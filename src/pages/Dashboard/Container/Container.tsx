import { PropsWithChildren } from "react";
import { AdminResources } from "services/types";
import createLinkGroups from "../AIF/createLinkGroups";
import Sidebar from "./Sidebar";
import SidebarToggleButton from "./SidebarToggleButton";

type Props = PropsWithChildren<{ adminResources: AdminResources }>;

export default function Container({ children, adminResources }: Props) {
  const linkGroups = createLinkGroups(adminResources.id);

  return (
    <div className="grid sm:grid-cols-[auto_1fr] w-full h-full">
      <SidebarToggleButton
        className="sm:hidden"
        endowId={adminResources.id}
        linkGroups={linkGroups}
      />
      <Sidebar
        linkGroups={linkGroups}
        className="max-sm:hidden"
        endowId={adminResources.id}
      />
      <div className="max-sm:py-8 max-sm:px-6 sm:p-10 h-full">{children}</div>
    </div>
  );
}
