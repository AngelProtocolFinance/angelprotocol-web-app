import { AdminMobileNavPortal } from "App/Header/MobileNav";
import { useAdminResources } from "../Guard";
import Nav from "./Nav";
import Views from "./Views";

export default function Charity() {
  const { endowmentId } = useAdminResources();
  return (
    <div className="padded-container grid grid-rows-[auto_1fr] pb-8 gap-2 pt-28">
      <Nav />
      <div className="block md:hidden">
        <AdminMobileNavPortal id={endowmentId} />
      </div>
      <Views />
    </div>
  );
}
