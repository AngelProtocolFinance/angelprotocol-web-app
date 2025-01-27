import { Outlet } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { CircleAlert } from "lucide-react";
import type { DashboardData } from "./api";
import { Loaded } from "./loaded";
import { monthPeriod } from "./month-period";
export { clientLoader } from "api/cache";

export {
  dashboardData as loader,
  endowUpdateAction as action,
} from "./api";

export { ErrorBoundary } from "components/error";
export default function Dashboard() {
  const { alloc, bal } = useCachedLoaderData<DashboardData>();
  const period = monthPeriod();

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      {period.isPre && (
        <div className="bg-gray-l4 text-navy-l1 text-sm p-2 rounded-sm">
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
