import AdminMobileNavPortal from "App/Header/MobileHeader/useMenuModal/AdminMobileNavPortal";
import { useAdminResources } from "../Guard";
import Nav from "./Nav";
import Views from "./Views";

export default function Charity() {
  const { endowmentId } = useAdminResources();
  return (
    <div className="padded-container grid grid-rows-[auto_1fr] pb-4 gap-2">
      <Nav />
      <div className="block md:hidden">
        <AdminMobileNavPortal id={endowmentId} />
      </div>
      <Views />
    </div>
  );
}
