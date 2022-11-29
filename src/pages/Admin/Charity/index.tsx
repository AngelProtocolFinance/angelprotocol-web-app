import { AdminMobileNavPortal } from "App/Header/MobileNav";
import { useAdminResources } from "../Guard";
import Nav from "./Nav";
import Views from "./Views";

export default function Charity() {
  const { endowmentId } = useAdminResources();
  return (
    <div className="w-full pb-8 pt-28 bg-gray-l5 dark:bg-blue-d5 text-gray-d2 dark:text-white">
      <div className="padded-container grid grid-rows-[auto_1fr] gap-2 my-4">
        <Nav />
        <div className="block md:hidden">
          <AdminMobileNavPortal id={endowmentId} />
        </div>
        <Views />
      </div>
    </div>
  );
}
