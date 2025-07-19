import { Outlet } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import type { DonationsPage } from "types/donations";
import { use_admin_data } from "../use-admin-data";
import { Allocation } from "./allocation";
import DonationsTable from "./donations-table";
export { ErrorBoundary } from "components/error";
export { loader, action } from "./api";
export { clientLoader } from "api/cache";
export default function Donations() {
  const page1 = useCachedLoaderData() as DonationsPage;
  const data = use_admin_data();
  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-4">Donations</h2>
      <Allocation
        classes="mb-4"
        allocation={
          data?.endow.allocation || {
            liq: 100,
            cash: 0,
            lock: 0,
          }
        }
      />
      <DonationsTable page1={page1} />
      {/** edit allocation */}
      <Outlet />
    </div>
  );
}
