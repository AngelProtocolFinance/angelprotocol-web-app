import { AdminMobileNavPortal } from "App/Header/MobileNav";
import Nav from "./Nav";
import Views from "./Views";

export default function Charity() {
  return (
    <div className="padded-container grid grid-rows-[auto_1fr] pb-4 gap-2">
      <Nav />
      <div className="block md:hidden">
        <AdminMobileNavPortal id={1} />
      </div>
      <Views />
    </div>
  );
}
