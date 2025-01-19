import { type ClientLoaderFunction, Outlet } from "@remix-run/react";
import { CircleAlert } from "lucide-react";
import { cacheClientLoader, useCachedLoaderData } from "remix-client-cache";
import { Loaded } from "./Loaded";
import type { DashboardData } from "./api";
import { monthPeriod } from "./monthPeriod";
export const clientLoader: ClientLoaderFunction = (args) =>
  cacheClientLoader(args);
clientLoader.hydrate = true;

export {
  dashboardData as loader,
  endowUpdateAction as action,
} from "./api";
export default function Dashboard() {
  const { alloc, bal } = useCachedLoaderData() as DashboardData;
  const period = monthPeriod();

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      {period.isPre && (
        <div className="bg-gray-l4 text-navy-l1 text-sm p-2 rounded">
          <CircleAlert size={16} className="relative inline bottom-px mr-1" />
          Pending transactions are now locked for processing
        </div>
      )}

      <Loaded balances={bal} allocation={alloc} />
      {/** prompts render here */}
      <Outlet />
    </div>
  );
}
