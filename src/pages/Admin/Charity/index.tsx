import { Main as AdminMobileNavPortal } from "App/Header/MobileNav/portals/admin";
import { useAdminResources } from "../Guard";
import Nav from "./Nav";
import Views from "./Views";

export default function Charity() {
  const { endowmentId } = useAdminResources();
  return (
    <div className="padded-container grid grid-rows-[auto_1fr] gap-2 pt-4 pb-8 font-work">
      <Nav />
      <div className="block md:hidden">
        <AdminMobileNavPortal id={endowmentId} />
      </div>
      <Views />
    </div>
  );
}
