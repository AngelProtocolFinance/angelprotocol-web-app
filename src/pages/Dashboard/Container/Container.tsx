import { PropsWithChildren } from "react";
import { AdminResources } from "services/types";
import createLinkGroups from "../AIF/createLinkGroups";
import MobileNavigationButton from "./MobileNavigationButton";
import Sidebar from "./Sidebar";

type Props = PropsWithChildren<{ adminResources: AdminResources }>;

export default function Container({ children, adminResources }: Props) {
  const linkGroups = createLinkGroups(adminResources.id);

  return (
    <div className="grid sm:grid-cols-[auto_1fr] w-full h-full">
      <MobileNavigationButton className="sm:hidden" linkGroups={linkGroups} />
      <Sidebar
        linkGroups={linkGroups}
        className="max-sm:hidden"
        adminResources={adminResources}
      />
      <div className="max-sm:py-8 max-sm:px-6 sm:p-10 h-full">{children}</div>
    </div>
  );
}
