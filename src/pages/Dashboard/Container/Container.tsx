import { PropsWithChildren } from "react";
import { LinkGroup } from "../types";
import { useProfileContext } from "contexts/ProfileContext";
import MobileNavigationButton from "./MobileNavigationButton";
import Sidebar from "./Sidebar";

type Props = PropsWithChildren<{ linkGroups: LinkGroup[] }>;

export default function Container({ children, linkGroups }: Props) {
  const profile = useProfileContext();

  return (
    <div className="grid sm:grid-cols-[auto_1fr] w-full h-full">
      <MobileNavigationButton className="sm:hidden" linkGroups={linkGroups} />
      <Sidebar
        linkGroups={linkGroups}
        className="max-sm:hidden"
        profile={profile}
      />
      <div className="max-sm:py-8 max-sm:px-6 sm:p-10 h-full">{children}</div>
    </div>
  );
}
